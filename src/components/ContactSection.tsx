  import React, { useState, useEffect, useRef, useCallback } from 'react';
  import { Mail, Github, Linkedin, Phone, MapPin, Send } from 'lucide-react';

  // ContactBlockProps and ContactBlock component are no longer strictly needed for email/phone links
  // but keeping them defined in case they are used elsewhere or for future modifications.
  interface ContactBlockProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    href: string;
  }

  const ContactBlock = ({ icon, label, value, href }: ContactBlockProps) => {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="flex items-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group flex-grow sm:flex-grow-0 min-w-[200px]"
      >
        <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 mr-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors duration-300">
          <div className="text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-lg">
            {label}
          </h3>
          {value && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {value}
            </p>
          )}
        </div>
      </a>
    );
  };

  interface SocialIconProps {
    icon: React.ReactElement;
    href: string;
    label: string;
  }

  const SocialIcon = ({ icon, href, label }: SocialIconProps) => {
    const clonedIcon = React.cloneElement(icon, {
      className: `w-10 h-10 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`,
    });
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 group hover:scale-110"
        aria-label={label}
      >
        {clonedIcon}
      </a>
    );
  };


  const ContactSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.2 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
        observer.disconnect();
      };
    }, []);

    return (
      <section
        ref={sectionRef}
        id="contact"
        className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50 font-sans"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transform transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center justify-center mb-6">
              <Mail className="mr-4 w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Let's Connect
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12">
            {/* Contact Information Column */}
            <div className={`transform transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              

              {/* Email and Phone as casual links */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 mb-8">
                <a
                  href="mailto:omkarvenkat09@gmail.com"
                  className="flex items-center text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  <Mail className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  Email Me
                </a>
                <a
                  href="tel:+917337501892"
                  className="flex items-center text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  <Phone className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  Give me a call
                </a>
              </div>

              {/* Connect Online Section - Social icons */}
              <div className="mb-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Connect Online
                </h3>
                <div className="flex justify-center items-center gap-6">
                  <SocialIcon
                    icon={<Github />}
                    href="https://github.com/Omkar-733"
                    label="GitHub Profile"
                  />
                  <SocialIcon
                    icon={<Linkedin />}
                    href="https://linkedin.com/in/omkarvenkatgogula"
                    label="LinkedIn Profile"
                  />
                </div>
              </div>

              {/* Location Info - Restored and styled as a separate block */}
              

            </div>

          </div>
        </div>

      </section>
    );
  };

  export default ContactSection;
