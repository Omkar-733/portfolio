import React from 'react';
import { useState } from 'react';
import { Mail, Github, Linkedin, Code } from 'lucide-react';
import { HeaderProps } from './types';

// Navigation Link Component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block md:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
               dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100 text-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
  >
    {children}
  </a>
);

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-4 backdrop-blur-md transition-colors duration-300 dark:bg-gray-900/80 bg-white/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo/Name */}
        <a href="#" className="flex items-center space-x-2 text-2xl font-bold transition-colors duration-300 dark:text-gray-100 text-gray-900 hover:text-blue-500 dark:hover:text-blue-400 rounded-lg p-2">
          <Code className="w-6 h-6" />
          <span>Omkar Venkat Gogula</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 00-.707-.293H15a1 1 0 000-2h-.007a1 1 0 00-.707.293l-.707.707a1 1 0 001.414 1.414l.707-.707zm-7.072 7.072l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM3 10a1 1 0 01-1-1V9a1 1 0 112 0v1a1 1 0 01-1 1zm2.12-10.607a1 1 0 01.707-.293H5a1 1 0 010-2h.007a1 1 0 01.707.293l.707.707a1 1 0 01-1.414 1.414l-.707-.707zm-3.536 11.314l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md dark:hover:bg-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 dark:text-gray-100 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <NavLink href="#about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink href="#skills" onClick={() => setIsOpen(false)}>Skills</NavLink>
          <NavLink href="#projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
          <NavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
          <div className="flex justify-center pt-2">
            <button
              onClick={() => { toggleDarkMode(); setIsOpen(false); }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 00-.707-.293H15a1 1 0 000-2h-.007a1 1 0 00-.707.293l-.707.707a1 1 0 001.414 1.414l.707-.707zm-7.072 7.072l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM3 10a1 1 0 01-1-1V9a1 1 0 112 0v1a1 1 0 01-1 1zm2.12-10.607a1 1 0 01.707-.293H5a1 1 0 010-2h.007a1 1 0 01.707.293l.707.707a1 1 0 01-1.414 1.414l-.707-.707zm-3.536 11.314l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
