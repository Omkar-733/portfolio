import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/stars.css';
import './styles/global.css';
import './styles/background.css';

// Stars animation component
const Stars = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes star-1 {
        0% { transform: translate(0, 0) scale(0.3); opacity: 0; }
        25% { transform: translate(-25%, -25%) scale(1.2); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
        75% { transform: translate(-25%, -25%) scale(1.2); opacity: 0.8; }
        100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
      }
      @keyframes star-2 {
        0% { transform: translate(0, 0) scale(0.3); opacity: 0; }
        25% { transform: translate(25%, -25%) scale(1.2); opacity: 0.8; }
        50% { transform: translate(50%, -50%) scale(1.5); opacity: 1; }
        75% { transform: translate(25%, -25%) scale(1.2); opacity: 0.8; }
        100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
      }
      @keyframes star-3 {
        0% { transform: translate(0, 0) scale(0.3); opacity: 0; }
        25% { transform: translate(0, -25%) scale(1.2); opacity: 0.8; }
        50% { transform: translate(0, -50%) scale(1.5); opacity: 1; }
        75% { transform: translate(0, -25%) scale(1.2); opacity: 0.8; }
        100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        33% { opacity: 0.7; }
        66% { opacity: 0.4; }
      }
      @keyframes scale {
        0% { transform: scale(0.3); }
        25% { transform: scale(0.8); }
        50% { transform: scale(1.2); }
        75% { transform: scale(0.8); }
        100% { transform: scale(0.3); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div 
          key={i}
          className={`absolute w-0.5 h-0.5 bg-white dark:bg-gray-200 rounded-full pointer-events-none`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animation: `
              ${i % 3 === 0 ? 'star-1' : i % 3 === 1 ? 'star-2' : 'star-3'} 8s infinite,
              ${i % 2 === 0 ? 'blink' : ''} 1.5s infinite,
              scale 8s infinite
            `
          }}
        />
      ))}
    </div>
  );
};

// Error boundary component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-lg">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button 
      onClick={resetErrorBoundary} 
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
);

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
  </div>
);

// Main App Component
const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  // Custom hook for dark mode
  const useDarkMode = () => {
    React.useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [isDarkMode]);
  };

  useDarkMode();

  // Lazy load components
  const Header = lazy(() => import('./components/Header.tsx'));
  const HeroSection = lazy(() => import('./components/HeroSection.tsx'));
  const AboutSection = lazy(() => import('./components/AboutSection.tsx'));
  const SkillsSection = lazy(() => import('./components/SkillsSection.tsx'));
  const ProjectsSection = lazy(() => import('./components/ProjectsSection.tsx'));
  const ContactSection = lazy(() => import('./components/ContactSection.tsx'));
  const Footer = lazy(() => import('./components/Footer.tsx'));

  // Create query client for data fetching
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className={`min-h-screen relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
            <Stars />
            <Suspense fallback={<LoadingSkeleton />}>
              <Header toggleDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
              <main className="container mx-auto px-4 py-8">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
              </main>
              <Footer />
            </Suspense>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
