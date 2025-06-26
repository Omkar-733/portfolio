import React from 'react';

const Footer: React.FC = () => (
  <footer className="py-8 text-center text-sm dark:text-gray-400 text-gray-600 border-t border-gray-200 dark:border-gray-800 mt-12">
    <div className="container mx-auto px-4">
      <p>&copy; {new Date().getFullYear()} Omkar Venkat Gogula. All rights reserved.</p>
      <p className="mt-2">Built with React and Tailwind CSS</p>
    </div>
  </footer>
);

export default Footer;
