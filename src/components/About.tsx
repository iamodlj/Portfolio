
import { useState, useEffect, useRef } from 'react';
import { Code, Globe, UserCheck } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Skill {
  category: string;
  items: string[];
  icon: JSX.Element;
}

const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    icon: <Globe size={24} className="text-black/80" />,
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "SQL"],
    icon: <Code size={24} className="text-black/80" />,
  },
  {
    category: "Others",
    items: ["Git", "PHP", "UI/UX Design", "Responsive Design", "SEO", "Performance Optimization"],
    icon: <UserCheck size={24} className="text-black/80" />,
  },
];

const About = () => {
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
                <h3 className="font-bold text-xl">Abraham Sackey Ohene Gyan</h3>
                <p className="text-black/70">Full-stack Developer</p>
              </div>
            </div>
            
            <p className="text-lg text-black/70 mb-6 text-balance">
              I'm a web developer with a focus on creating clean, functional, and user-friendly websites and applications. With a passion for both design and development, I bridge the gap between aesthetics and functionality.
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
            <h3 className="text-xl font-bold mb-8">Skills & Expertise</h3>
            
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div 
                  key={skill.category}
                  className={`${isVisible ? 'opacity-0 animate-fade-in' : ''}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4">
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold">{skill.category}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 ml-14">
                    {skill.items.map(item => (
                      <span 
                        key={item} 
                        className="px-3 py-1 bg-black/5 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
