import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Code, Database, Lock, Sprout, Monitor, ShieldCheck, Wine, Calculator, Sparkles, Church } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  icon?: JSX.Element;
}

const projects: Project[] = [
  {
    id: 0,
    title: "Clapes Department",
    description: "Clapes Department clothing brand E-commerce website. Providing a modern, component-based architecture. Features include responsive design, modern dark UI, product catalog with filtering, contact form with validation, about page, shopping cart and checkout, image gallery with filtering, and smooth animations. Deployed on Vercel.",
    image: "/clapesdept.png",
    tags: ["React.js", "CSS", "E-commerce", "Vercel"],
    link: "https://www.clapesdepartment.com/",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 1,
    title: "Calculator App",
    description: "Calculator built with React and styled with Tailwind CSS. Features basic arithmetic operations, clear and backspace functionality, modern responsive design, error handling for invalid calculations, SEO optimization, and PWA ready with manifest.json.",
    image: "/Calculator.png",
    tags: ["React", "Tailwind CSS", "JavaScript", "PWA"],
    link: "https://calculator-app-iamodljs-projects.vercel.app/",
    icon: <Calculator size={20} className="text-black/80" />,
  },
  {
    id: 2,
    title: "Web-Based Ghana Vehicle Check",
    description: "Created a platform bridging the gap between DVLA and Ghana Police Serive(MTTD) allowing law enforcement to verify vehicle registration and ownership data. Integrated a backend system to flag stolen vehicles during traffic checks. Serving as my final year project in the university - UPSA",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop",
    tags: ["PHP", "HTML", "CSS", "JavaScript", "EmailJS", "AJAX", "GitHub", "Chart.js"],
    link: "https://github.com/iamodlj/",
    icon: <Database size={20} className="text-black/80" />,
  },
  {
    id: 3,
    title: "Abokobi Secure Banking Shield",
    description: "A modern banking platform designed for rural banking in Ghana with comprehensive fraud protection features, secure authentication, and user-friendly interfaces. Includes multi-factor authentication, secure transaction processing, and advanced fraud monitoring.",
    image: "/abokobi-banking-login.png", 
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    link: "https://abokobi-banking.vercel.app/",
    icon: <ShieldCheck size={20} className="text-black/80" />,
  },
  {
    id: 4,
    title: "Secure Password Manager",
    description: "A secure password manager implemented in Python. It allows you to store, retrieve, and manage your passwords securely using encryption.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    tags: ["Python", "Encryption", "Security"],
    link: "https://github.com/iamodlj/password-manager-project",
    icon: <Lock size={20} className="text-black/80" />,
  },
  {
    id: 5,
    title: "Agrisoz",
    description: "An AI-powered system that assists farmers in swiftly identifying, diagnosing, and addressing issues related to crops and livestock, enhancing productivity and reducing losses. Worked as a frontend developer for the project. Team Lead for this project",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn-ui", "Vite"],
    link: "https://github.com/iamodlj/",
    icon: <Sprout size={20} className="text-black/80" />,
  },
  {
    id: 6,
    title: "Website for PrimeTech",
    description: "A responsive, modern website developed for PrimeTech showcasing their services and products.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1600&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "Git"],
    link: "https://iamodlj.github.io/PrimeTech/",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 7,
    title: "Personal Portfolio",
    description: "A showcase of my work and abilities as a developer.",
    image: "https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Vite", "TypeScript", "shadcn-ui", "Tailwind CSS"],
    link: "#",
    icon: <Code size={20} className="text-black/80" />,
  },
  {
    id: 8,
    title: "Weather Dashboard",
    description: "Real-time weather information with beautiful visualizations.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1600&auto=format&fit=crop",
    tags: ["HTML", "JavaScript", "API", "CSS", "GitHub"],
    link: "https://iamodlj.github.io/weather-app/",
  },
  {
    id: 9,
    title: "TicTacToe Game",
    description: "A classic TicTacToe game with both Player vs Player and Player vs AI modes. Features a modern UI design and smooth animations.",
    image: "/TicTacToe.png",
    tags: ["HTML", "CSS", "JavaScript", "Game Development"],
    link: "https://tic-tac-toc-taupe.vercel.app/",
    icon: <Code size={20} className="text-black/80" />,
  },
  {
    id: 10,
    title: "Kool Hib",
    description: "An e-commerce platform for a premium hibiscus-based beverage brand based in Accra, Ghana. Features include product catalog, shopping cart functionality, responsive design, blog section, and SEO optimization for their line of premium juices.",
    image: "/kool_hib_preview.png",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    link: "https://kool-hib.vercel.app/",
    icon: <Wine size={20} className="text-black/80" />,
  },
  {
    id: 11,
    title: "Luna Essence Spa",
    description: "A beautiful, modern spa booking website with SMS confirmations, built with React, TypeScript, and TailwindCSS. Features glassmorphism effects, fully responsive design, interactive UI with dynamic SVG backgrounds, real-time SMS booking system via MNotify API, and Vercel Analytics integration.",
    image: "/Luna.png",
    tags: ["React", "TypeScript", "TailwindCSS", "Vite", "shadcn/ui"],
    link: "https://lunaessencespa.com",
    icon: <Sparkles size={20} className="text-black/80" />,
  },
  {
    id: 12,
    title: "Grace Avenue Church Management System",
    description: "A comprehensive church management system built with React, Vite, and Supabase for Grace Avenue Church in Ghana. Features role-based access control, member and visitor management, attendance tracking, financial management, SMS broadcasting, equipment management, and analytics with real-time updates.",
    image: "/Grace_Avenue.png",
    tags: ["React", "TypeScript", "Supabase", "Vite", "shadcn/ui", "PostgreSQL"],
    link: "https://github.com/iamodlj",
    icon: <Church size={20} className="text-black/80" />,
  },
{
   id: 13,
    title: "Makarios Consult",
    description: "A modern, responsive website for Makarios Consult - a professional business consulting firm specializing in operations, healthcare strategy, and brand development. Features modern design, responsive layout, Calendly integration, team profiles, contact forms, fast performance, SEO optimization, and social media meta tags.",
    image: "/makariocapital.png",
    tags: [
      "React 18", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "shadcn/ui", "React Router DOM", "React Hook Form", "Zod", "Lucide React", "GoDaddy DNS"
    ],
    link: "https://www.makariocapital.com",
    icon: <Sparkles size={20} className="text-black/80" />,
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={`py-20 md:py-32 ${isVisible ? 'scroll-section visible' : 'scroll-section'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="subtle-glass inline-block px-4 py-1 rounded-full mb-6">
            <p className="text-sm font-medium text-black/70">My Work</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Featured Projects</h2>
          <p className="text-lg text-black/70">
            A selection of my recent work, showcasing my skills in design and development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`glass rounded-2xl overflow-hidden hover-lift ${
                isVisible 
                  ? 'opacity-100 animate-fade-in' 
                  : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {project.icon && <div className="flex items-center justify-center">{project.icon}</div>}
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
                <p className="text-black/70 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  className="inline-flex items-center font-medium text-black"
                >
                  View Project
                  <ArrowUpRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
