import React, { useState, useEffect } from 'react';
import { Code, Sparkles, ChevronDown, Github, Mail, Download, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const roles = [
    "Full Stack Developer",
    "AI/ML Enthusiast",
    "Problem Solver",
    "Tech Innovator"
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Role rotation effect
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => { // Added type for e
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(roleInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => { // Added type for sectionId
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden"
    >
      {/* Dynamic Background with Parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        {/* Animated Background Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) translate(-50%, -50%)`
          }}
        />

        {/* Floating Code Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-300/20 text-xs font-mono animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {['</>', '{}', '[]', '()', '&&', '||', '==='][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Logo/Icon Animation */}
        <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-75'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
            <Code className="relative w-16 h-16 md:w-20 md:h-20 text-blue-400 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Name - Now with white text */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white"> {/* Added text-white here */}
            <span>
              Omkar Venkat
            </span>
            <br />
            <span>
              Gogula
            </span>
          </h1>
        </div>

        {/* Dynamic Role Display */}
        <div className={`mb-12 h-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
            <span className="text-blue-400 font-semibold">I'm a </span>
            <span className="relative inline-block">
              {/* Role text is now blue-400, removed gradient and pulse */}
              <span
                key={currentRole}
                className="absolute inset-0 text-blue-400 font-bold animate-fadeInUp"
              >
                {roles[currentRole]}
              </span>
              <span className="invisible font-bold">{roles[currentRole]}</span>
            </span>
          </p>
        </div>

        {/* Description */}
        <div className={`mb-12 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating innovative digital solutions that bridge the gap between
            <span className="text-blue-400 font-semibold"> cutting-edge technology</span> and
            <span className="text-purple-400 font-semibold"> real-world impact</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              Get In Touch
              <Mail className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <a
            href="https://github.com/Omkar-733"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm bg-white/5"
          >
            <span className="flex items-center justify-center">
              View My Work
              <Github className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </a>
          <a
            href="Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-semibold text-lg hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm bg-white/5"
          >
            <span className="flex items-center justify-center">
              Download CV
              <Download className="ml-2 w-5 h-5 group-hover:bounce transition-transform duration-300" />
            </span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className={`transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => scrollToSection('skills')}
            className="group flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300 animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            <span className="text-sm font-medium mb-2 group-hover:text-blue-400 transition-colors duration-300">
              Explore My Skills
            </span>
            <div className="relative">
              <ChevronDown className="w-8 h-8 group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        /* Custom gradient text animation */
        .gradient-text {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
