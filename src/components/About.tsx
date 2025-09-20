import { useState, useEffect, useRef } from 'react';
import { Code, Globe, UserCheck } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TechStack {
  name: string;
  logo: string;
}

const techStacks = [
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  },
  {
    name: 'HTML5',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  },
  {
    name: 'CSS3',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    name: 'PHP',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
  },
  {
    name: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  },
  {
    name: 'Git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  },
  {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  },
  {
    name: 'Spring Boot',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
  },
  {
    name: 'Photoshop',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg'
  }
  ,
  {
    name: 'JSF',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' // Placeholder, replace with  if available
  }
  ,
  {
    name: 'Supabase',
    logo: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png'
  }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleDownloadResume = () => {
    // Create a link to the resume file and trigger download
    const link = document.createElement('a');
    link.href = '/public/public/RESUME_Abraham_Sackey_Ohene_Gyan.pdf';
    link.download = 'Abraham_Sackey_Ohene_Gyan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 md:py-32 bg-black/5 ${isVisible ? 'scroll-section visible' : 'scroll-section'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="subtle-glass inline-block px-4 py-1 rounded-full mb-6">
              <p className="text-sm font-medium text-black/70">About Me</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Passionate about creating memorable digital experiences
            </h2>
            
            <div className="flex items-center mb-6">
              <Avatar className="h-20 w-20 border-2 border-white shadow-lg mr-6">
                <AvatarImage src="/profile.png" alt="Profile picture" />
                <AvatarFallback>ASOG</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-xl">Abraham Sackey Ohene Gyan (ASOG)</h3>
                <p className="text-black/70">Web Developer / Software Engineer </p>
              </div>
            </div>
            
            <p className="text-lg text-black/70 mb-6 text-balance">
              I'm a Web Developer / Software Engineer with a focus on creating clean, functional, and user-friendly websites and applications. With a passion for both design and development, I bridge the gap between aesthetics and functionality.
            </p>
            <p className="text-lg text-black/70 mb-8 text-balance">
              My approach to web development is centered around simplicity, usability, and performance. I believe that good design is invisible, and that the best websites are those that provide a seamless user experience.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-black text-white rounded-full font-medium hover-lift"
              >
                Get in Touch
              </a>
              <button 
                onClick={handleDownloadResume} 
                className="px-6 py-3 border border-black/10 rounded-full font-medium hover-lift"
              >
                Download Resume
              </button>
            </div>
          </div>
          
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-8">Tech Stack</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStacks.map((tech, index) => (
                <div 
                  key={tech.name}
                  className={`group flex flex-col items-center justify-center p-4 rounded-lg bg-black/5 hover:bg-black/10 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isVisible ? 'opacity-0 animate-fade-in' : ''
                  }`}
                  style={{ '--animation-delay': `${index * 100}ms` } as React.CSSProperties}
                >
                  <div className="w-12 h-12 mb-2 transform transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-black/70 group-hover:text-black transition-colors duration-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
