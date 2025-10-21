import React, { useState, useEffect, useRef } from 'react';
import { User, GraduationCap, Building, Award, MapPin, Calendar, ArrowRight, Quote } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'journey' | 'education' | 'values'>('journey');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const professionalJourney = [
        {
      year: "May 2025-June 2025",
      title: "System Developer",
      organization: "Visakhapatnam Steel Plant",
      location: "Visakhapatnam, Andhra Pradesh", 
      description: "Designed and implemented a comprehensive defect management system, streamlining industrial operations and improving quality control processes.",
      type: "Professional"
    },
    {year: "2025",
      title: "Game Developer",
      organization: "APSSDC",
      location: "Virtual", 
      description: "Designed and implemented Game called 3D Tanks,for multiplayer from single device which gives more fun and responsive.",
      type: "project"
      
    },
    {
      year: "2023",
      title: "Software Engineering Intern",
      organization: "Visakhapatnam Port Trust",
      location: "Visakhapatnam, Andhra Pradesh",
      description: "Gained hands-on experience in computational problem-solving and advanced software development methodologies within a critical infrastructure environment.",
      type: "professional"
    },

    
    {
      year: "2022-Present",
      title: "Bachelor of Technology",
      organization: "Computer Science & Engineering",
      location: "Andhra Pradesh",
      description: "Pursuing comprehensive education in computer science with focus on software engineering, data structures, algorithms, and emerging technologies.",
      type: "education"
    }
  ];

  const coreValues = [
    {
      title: "Innovation & Excellence",
      description: "Committed to delivering high-quality solutions that push the boundaries of what's possible while maintaining the highest standards of craftsmanship.",
      icon: Award
    },
    {
      title: "Continuous Learning",
      description: "Embracing new technologies and methodologies to stay at the forefront of software development and contribute meaningfully to the tech ecosystem.",
      icon: GraduationCap
    },
    {
      title: "Collaborative Impact",
      description: "Believing in the power of teamwork and knowledge sharing to create solutions that make a real difference in people's lives and business operations.",
      icon: Building
    }
  ];

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }: { 
    id: string; 
    label: string; 
    icon: any; 
    isActive: boolean; 
    onClick: () => void 
  }) => (
    <button
      onClick={onClick}
      className={`group flex items-center px-6 py-4 text-left transition-all duration-300 rounded-lg border ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <Icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${
        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
      }`} />
      <span className="font-medium">{label}</span>
      {isActive && <ArrowRight className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400" />}
    </button>
  );

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 px-4 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transform transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center mb-6">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">About Me</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I am a dedicated software engineer currently pursuing my Bachelor of Technology in Computer Science & Engineering. 
                My passion lies in developing innovative solutions that bridge the gap between complex technical challenges and 
                practical business needs.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Through my internships and project work, I have gained valuable experience in full-stack development, 
                system architecture, and problem-solving within industrial environments. I am committed to continuous 
                learning and contributing to meaningful technological advancement.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visakhapatnam, Andhra Pradesh
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  BTech Computer Science (In Progress)
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Building className="w-4 h-4 mr-2" />
                  Full Stack Developer
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Content */}
        <div className={`grid lg:grid-cols-4 gap-8 transform transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-3 sticky top-8">
              <TabButton 
                id="journey" 
                label="Professional Journey" 
                icon={Building}
                isActive={activeSection === 'journey'} 
                onClick={() => setActiveSection('journey')} 
              />
              <TabButton 
                id="education" 
                label="Education & Growth" 
                icon={GraduationCap}
                isActive={activeSection === 'education'} 
                onClick={() => setActiveSection('education')} 
              />
              <TabButton 
                id="values" 
                label="Values & Philosophy" 
                icon={Award}
                isActive={activeSection === 'values'} 
                onClick={() => setActiveSection('values')} 
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeSection === 'journey' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Timeline</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    My journey in software development, from academic pursuits to real-world applications.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {professionalJourney.map((item, index) => (
                    <div key={index} className="group relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900"></div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 group-hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">{item.organization}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {item.year}
                            </div>
                            <div className="flex items-center mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {item.location}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Educational Foundation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Building a strong technical foundation through comprehensive education and practical application.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-3">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Bachelor of Technology - Computer Science & Engineering
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 mb-4">Currently Pursuing • Expected 2026</p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        Comprehensive curriculum covering software engineering principles, data structures, algorithms, 
                        database systems, and emerging technologies. Strong emphasis on practical application through 
                        projects and internships.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Core Areas</h5>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Software Engineering</li>
                            <li>• Data Structures & Algorithms</li>
                            <li>• Database Management Systems</li>
                            <li>• Computer Networks</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Specializations</h5>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Full Stack Development</li>
                            <li>• Artificial Intelligence</li>
                            <li>• System Design</li>
                            <li>• Machine Learning</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'values' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Philosophy</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The principles and values that guide my approach to software development and professional growth.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-8">
                  <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
                    "Technology is best when it brings people together and solves real problems. 
                    My goal is to create solutions that not only meet technical requirements but also 
                    contribute positively to the user experience and business objectives."
                  </blockquote>
                </div>

                <div className="grid gap-6">
                  {coreValues.map((value, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                          <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-expand { animation: expand 0.3s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default AboutSection;
