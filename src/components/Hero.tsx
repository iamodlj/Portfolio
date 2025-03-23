
import { ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const moveX = x * 20 - 10;  // -10 to 10px range
      const moveY = y * 20 - 10;  // -10 to 10px range
      
      backgroundRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          ref={backgroundRef}
          className="absolute inset-0 transition-transform duration-500 ease-out" 
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="subtle-glass inline-block px-4 py-1 rounded-full mb-6 opacity-0 animate-fade-in animate-delay-100">
            <p className="text-sm font-medium text-black/70">Portfolio</p>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 opacity-0 animate-fade-in animate-delay-200 text-balance">
            I Design & Build <br />
            <span className="text-black">Digital Experiences</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/70 max-w-2xl mb-10 opacity-0 animate-fade-in animate-delay-300 text-balance">
            Full-stack developer crafting elegant, intuitive, and functional web applications that solve real problems with simplicity and precision.
          </p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in animate-delay-400">
            <a 
              href="#projects" 
              className="px-6 py-3 bg-black text-white rounded-full font-medium hover-lift"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-black/10 rounded-full font-medium hover-lift"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in animate-delay-500">
        <p className="text-sm font-medium text-black/60 mb-2">Scroll Down</p>
        <ArrowDown size={20} className="animate-bounce text-black/60" />
      </div>
    </section>
  );
};

export default Hero;
