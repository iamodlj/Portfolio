
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Code, Database, Lock, Sprout, Monitor } from 'lucide-react';

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
    id: 1,
    title: "Web-Based Ghana Vehicle Check",
    description: "Created a platform allowing law enforcement to verify vehicle registration and ownership data. Integrated a backend system to flag stolen vehicles during traffic checks.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600&auto=format&fit=crop",
    tags: ["PHP", "HTML", "CSS", "JavaScript", "APIs"],
    link: "#",
    icon: <Database size={20} className="text-black/80" />,
  },
  {
    id: 2,
    title: "Secure Password Manager",
    description: "A secure password manager implemented in Python. It allows you to store, retrieve, and manage your passwords securely using encryption.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1600&auto=format&fit=crop",
    tags: ["Python", "Encryption", "Security"],
    link: "#",
    icon: <Lock size={20} className="text-black/80" />,
  },
  {
    id: 3,
    title: "Agrisoz",
    description: "An AI-powered system that assists farmers in swiftly identifying, diagnosing, and addressing issues related to crops and livestock, enhancing productivity and reducing losses.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "AI", "Frontend"],
    link: "#",
    icon: <Sprout size={20} className="text-black/80" />,
  },
  {
    id: 4,
    title: "Website for PrimeTech",
    description: "A responsive, modern website developed for PrimeTech showcasing their services and products.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description: "A showcase of my work and abilities as a developer.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#",
    icon: <Code size={20} className="text-black/80" />,
  },
  {
    id: 6,
    title: "E-commerce Platform",
    description: "A fully functional online shopping experience with cart and checkout.",
    image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    id: 7,
    title: "Weather Dashboard",
    description: "Real-time weather information with beautiful visualizations.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop",
    tags: ["JavaScript", "API", "CSS"],
    link: "#",
  },
  {
    id: 8,
    title: "Task Management App",
    description: "Stay organized with this intuitive task tracker.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Firebase", "Tailwind"],
    link: "#",
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
                  ? 'opacity-0 animate-fade-in' 
                  : ''
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
