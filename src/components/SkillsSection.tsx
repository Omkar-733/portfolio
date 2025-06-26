import React, { useState, useEffect, useRef } from 'react';
import { Star, Code, Database, Cloud, Palette, Server, Smartphone } from 'lucide-react';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null); // Use useRef for IntersectionObserver

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set isVisible to true if the section is intersecting
        // Set to false if it's no longer intersecting, so animation can re-trigger
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const skills = [
    // Programming Languages
    {
      name: 'Python',
      category: 'Programming Languages',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'from-blue-500 to-yellow-500' // Example: from-blue-500 to-yellow-500
    },
    {
      name: 'JavaScript',
      category: 'Programming Languages',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Java',
      category: 'Programming Languages',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'C++',
      category: 'Programming Languages',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      color: 'from-blue-600 to-purple-600'
    },
    {
      name: 'PHP',
      category: 'Programming Languages',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      color: 'from-purple-500 to-indigo-500'
    },

    // Frontend
    {
      name: 'React',
      category: 'Frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      color: 'from-gray-700 to-gray-900'
    },
    {
      name: 'HTML5',
      category: 'Frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'CSS3',
      category: 'Frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      name: 'Bootstrap',
      category: 'Frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      color: 'from-purple-500 to-purple-600'
    },

    // Backend
    {
      name: 'Node.js',
      category: 'Backend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Express.js',
      category: 'Backend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      color: 'from-gray-600 to-gray-800'
    },
    {
      name: 'RESTful APIs',
      category: 'Backend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', // Reusing Node.js icon as a placeholder
      color: 'from-blue-500 to-green-500'
    },

    // Database
    {
      name: 'MongoDB',
      category: 'Database',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: 'from-green-500 to-green-700'
    },
    {
      name: 'MySQL',
      category: 'Database',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      color: 'from-blue-500 to-orange-500'
    },
    {
      name: 'Firebase',
      category: 'Database',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      color: 'from-yellow-400 to-orange-500'
    },

    // Cloud & Tools
    {
      name: 'Git',
      category: 'Cloud & Tools',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Google Gemini API',
      category: 'Cloud & Tools',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      color: 'from-blue-500 to-green-500'
    },
    {
      name: 'Android Studio',
      category: 'Cloud & Tools',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
      color: 'from-green-400 to-green-600'
    },

    // Deployment
    {
      name: 'Vercel',
      category: 'Deployment',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
      color: 'from-gray-700 to-black'
    },
    {
      name: 'Render',
      category: 'Deployment',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', // Placeholder
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'InfinityFree',
      category: 'Deployment',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', // Placeholder
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const categories = [
    { name: 'all', label: 'All Skills', icon: Star },
    { name: 'Programming Languages', label: 'Languages', icon: Code },
    { name: 'Frontend', label: 'Frontend', icon: Palette },
    { name: 'Backend', label: 'Backend', icon: Server },
    { name: 'Database', label: 'Database', icon: Database },
    { name: 'Cloud & Tools', label: 'Tools', icon: Cloud },
    { name: 'Deployment', label: 'Deployment', icon: Smartphone }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-20 px-4 relative overflow-hidden font-sans">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Star className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-0 w-12 h-12 bg-blue-600/20 dark:bg-blue-400/20 rounded-full blur-lg animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A comprehensive showcase of my technical proficiency across various domains of software development.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                  ${
                    activeCategory === category.name
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 dark:from-blue-500 dark:to-indigo-500'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        {/* The main grid container's opacity and transform are now directly controlled by isVisible */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6
          transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 delay-[400ms]' : 'opacity-0 translate-y-10'}`}>
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-center text-center
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ` /* These classes handle the initial state and target state for individual items */
              }
              style={{
                // Staggered transition delay applied directly based on index when section is visible
                transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
              }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

              {/* Icon container */}
              <div className="relative mb-4 flex justify-center">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform scale-110`}></div>
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      className="w-8 h-8 object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Skill name */}
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 text-sm leading-tight">
                {skill.name}
              </h3>

              {/* Hover effect indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { label: 'Programming Languages', count: skills.filter(s => s.category === 'Programming Languages').length },
            { label: 'Frontend Technologies', count: skills.filter(s => s.category === 'Frontend').length },
            { label: 'Backend & APIs', count: skills.filter(s => s.category === 'Backend').length },
            { label: 'Databases', count: skills.filter(s => s.category === 'Database').length }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                {stat.count}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
