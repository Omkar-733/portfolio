export interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export interface SectionProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  href: string;
}

export interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}
