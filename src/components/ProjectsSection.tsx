import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Briefcase, ExternalLink, Github, Eye, Calendar, Award, TrendingUp, X, Info } from 'lucide-react';

// Project Interface
interface Project {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  demo?: string;
  image: string;
  category: string;
  year: string;
  featured?: boolean;
  status: 'live' | 'development' | 'completed';
  highlights: string[];
  fullDescription: string;
  features: string[];
  challenges: string[];
  learnings: string[];
}

// Projects Data
const projects: Project[] = [
  {
    title: 'Digital Logbook System',
    description: 'Created a comprehensive digital platform for logging student activities, enhancing record-keeping accuracy and reducing paper usage with an intuitive user interface.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    link: 'https://github.com/Omkar-733/logger',
    demo: 'https://DigitalLogBook.ct.ws',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    category: 'Web Development',
    year: '2024',
    featured: true,
    status: 'live',
    highlights: ['Reduced paper usage by 80%', 'Improved accuracy by 95%', 'User-friendly interface'],
    fullDescription: 'The Digital Logbook System revolutionizes traditional record-keeping by providing a comprehensive digital platform for logging student activities. This system was designed to address the inefficiencies of paper-based logging systems while ensuring data accuracy and accessibility.',
    features: [
      'Secure user authentication and role-based access control',
      'Real-time activity logging with timestamp validation',
      'Advanced search and filtering capabilities',
      'Automated report generation and export functionality',
      'Mobile-responsive design for on-the-go access',
      'Data backup and recovery mechanisms'
    ],
    challenges: [
      'Migrating from legacy paper-based system to digital platform',
      'Ensuring data security and user privacy compliance',
      'Designing intuitive UI for users with varying technical skills',
      'Implementing robust validation to prevent data corruption'
    ],
    learnings: [
      'Enhanced skills in PHP backend development and MySQL optimization',
      'Gained experience in user experience design and accessibility',
      'Learned importance of data validation and security best practices',
      'Developed project management and stakeholder communication skills'
    ]
  },
  {
    title: 'Link Shrinker',
    description: 'Built a sophisticated URL shortening service with dynamic link generation, comprehensive analytics, and real-time click tracking capabilities.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Chart.js'],
    link: 'https://github.com/Omkar-733/Shrinkoo',
    demo: 'https://Shirnkoo.vercel.app/',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'Full Stack',
    year: '2024',
    featured: true,
    status: 'live',
    highlights: ['Real-time analytics', 'Custom domain support', 'RESTful API'],
    fullDescription: 'Link Shrinker is a modern URL shortening service that goes beyond basic link compression. Built with scalability and analytics in mind, it provides comprehensive insights into link performance while maintaining high availability and fast redirect times.',
    features: [
      'Custom alias creation and bulk URL shortening',
      'Real-time click analytics with geographic data',
      'QR code generation for shortened links',
      'Expiration date settings and password protection',
      'RESTful API for third-party integrations',
      'Dashboard with comprehensive analytics and reporting'
    ],
    challenges: [
      'Implementing efficient URL encoding algorithms for optimal performance',
      'Designing scalable database schema for high-volume link tracking',
      'Creating real-time analytics without compromising redirect speed',
      'Handling edge cases and preventing abuse of the service'
    ],
    learnings: [
      'Mastered Node.js backend development and MongoDB optimization',
      'Gained expertise in real-time data processing and analytics',
      'Learned about scalable system architecture and performance optimization',
      'Developed skills in API design and documentation'
    ]
  },
  {
    title: 'Student Feedback System',
    description: 'Designed an advanced feedback collection platform to evaluate course and faculty effectiveness with structured data analysis for continuous academic improvement.',
    techStack: ['HTML5', 'PHP', 'MySQL', 'Chart.js'],
    link: 'https://github.com/Omkar-733/Student-Feedback',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    category: 'Web Development',
    year: '2023',
    status: 'completed',
    highlights: ['Anonymous feedback', 'Advanced reporting', 'Data visualization'],
    fullDescription: 'The Student Feedback System provides a comprehensive platform for collecting, analyzing, and reporting student feedback on courses and faculty. The system ensures anonymity while providing valuable insights for academic improvement and quality assurance.',
    features: [
      'Anonymous feedback submission with unique session handling',
      'Multi-criteria evaluation forms with rating scales',
      'Advanced data visualization and trend analysis',
      'Automated report generation for administrators',
      'Faculty performance dashboard with actionable insights',
      'Export functionality for external analysis tools'
    ],
    challenges: [
      'Ensuring complete anonymity while preventing duplicate submissions',
      'Designing intuitive feedback forms that encourage honest responses',
      'Creating meaningful data visualizations for complex feedback data',
      'Balancing detailed feedback collection with user experience'
    ],
    learnings: [
      'Developed expertise in data analytics and visualization techniques',
      'Learned about user privacy and anonymity best practices',
      'Gained experience in educational technology and stakeholder management',
      'Enhanced skills in statistical analysis and reporting'
    ]
  },
  {
    title: 'Defect Handling System',
    description: 'Developed an enterprise-grade system at Visakhapatnam Steel Plant to log, track, and manage operational issues with real-time resolution capabilities.',
    techStack: ['Java Servlets', 'JSP', 'Oracle Database', 'AJAX'],
    link: 'https://github.com/Omkar-733/Defect-Handling-System',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    category: 'Enterprise',
    year: '2023',
    featured: true,
    status: 'completed',
    highlights: ['Enterprise-grade', 'Real-time tracking', 'Industrial application'],
    fullDescription: 'The Defect Handling System was developed for Visakhapatnam Steel Plant to streamline the process of logging, tracking, and resolving operational defects. This enterprise-grade solution improved operational efficiency and provided real-time visibility into defect resolution processes.',
    features: [
      'Comprehensive defect logging with priority classification',
      'Real-time tracking and status updates for all stakeholders',
      'Automated escalation based on defect severity and time',
      'Integrated reporting and analytics dashboard',
      'Multi-department workflow management',
      'Mobile-friendly interface for field operations'
    ],
    challenges: [
      'Integrating with existing enterprise systems and databases',
      'Designing workflows that accommodate complex organizational hierarchies',
      'Ensuring system reliability in critical industrial environment',
      'Creating user interfaces suitable for industrial settings'
    ],
    learnings: [
      'Gained experience in enterprise Java development and Oracle databases',
      'Learned about industrial process management and quality assurance',
      'Developed skills in system integration and enterprise architecture',
      'Enhanced understanding of user requirements in industrial settings'
    ]
  }
];

// ProjectModal Component
const ProjectModal: React.FC<{ project: Project; isOpen: boolean; onClose: () => void }> = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700';
      case 'development': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/20 dark:text-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
          {project.featured && (
            <div className="absolute top-4 left-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" />
                Featured
              </div>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{project.title}</h2>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {project.year}
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">{project.fullDescription}</p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Challenges Overcome</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Key Learnings</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {project.learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{learning}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <Github className="w-5 h-5" />
              View Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ProjectCard Component
const ProjectCard: React.FC<{ project: Project; index: number; onViewDetails: () => void; parentIsVisible: boolean }> = ({ project, index, onViewDetails, parentIsVisible }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (parentIsVisible) {
      // Staggered animation effect for cards, only triggered when parent section is visible
      timer = setTimeout(() => setIsVisible(true), index * 100);
    } else {
      // Reset visibility when parent is not visible (e.g., scrolled out of view)
      setIsVisible(false);
    }
    return () => clearTimeout(timer);
  }, [index, parentIsVisible]); // Dependency on parentIsVisible

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.src = `https://placehold.co/600x400/2563EB/FFFFFF?text=${encodeURIComponent(project.title)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700';
      case 'development': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/20 dark:text-gray-300 dark:border-gray-600';
    }
  };

  return (
    // Make the entire card div clickable
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${project.featured ? 'ring-2 ring-blue-500/20' : ''}`}
      onClick={onViewDetails} // Add onClick to the main div
      role="button" // Improve accessibility
      tabIndex={0} // Make it focusable
      aria-label={`View details for project ${project.title}`} // Provide an accessible label
    >
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Award className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {/* Removed the overlay with the "View Details" button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* No button needed here, the whole card is clickable */}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium dark:bg-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {project.year}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            // Stop propagation to prevent modal from opening when clicking code/demo links
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-white text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              // Stop propagation to prevent modal from opening when clicking code/demo links
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  // isVisible state for the entire section (for header animation)
  const [sectionHeaderIsVisible, setSectionHeaderIsVisible] = useState(false);
  // isVisible state specifically to trigger card animations (when the section enters view)
  const [cardsAreVisible, setCardsAreVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionHeaderIsVisible(entry.isIntersecting);
        setCardsAreVisible(entry.isIntersecting); // Also set cardsAreVisible
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      observer.disconnect();
    };
  }, []);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white">
      {/* Projects Section */}
      <section ref={sectionRef} id="projects" className="py-24 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transform transition-all duration-800 ${sectionHeaderIsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center justify-center mb-6">
              <Briefcase className="mr-4 w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                My Projects
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Here are some of the projects I've worked on, showcasing my skills and passion for development.
            </p>
          </div>
          {/* Grid for Project Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                onViewDetails={() => handleViewDetails(project)}
                parentIsVisible={cardsAreVisible} /* Pass visibility state to cards */
              />
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
