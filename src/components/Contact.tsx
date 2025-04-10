
import { useState, useEffect, useRef } from 'react';
import { Mail, Send, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Reset form
    setFormState({ name: '', email: '', message: '' });
    alert('Thank you for your message! I will get back to you soon.');
  };
  
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
      id="contact" 
      ref={sectionRef}
      className={`py-20 md:py-32 ${isVisible ? 'scroll-section visible' : 'scroll-section'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="subtle-glass inline-block px-4 py-1 rounded-full mb-6">
            <p className="text-sm font-medium text-black/70">Contact</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-black/70">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4">
                <Mail size={20} className="text-black/80" />
              </div>
              <div>
                <h4 className="font-semibold">Email Me </h4>
                <a 
                  href="mailto:ohenegyanfamily@gmail.com" 
                  className="text-black/70 hover:text-black transition-colors"
                >
                  ohenegyanfamily@gmail.com
                </a>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="font-semibold mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/iamodlj" 
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} className="text-black/80" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/abraham-sackey-ohene-gyan-5b0682b8/" 
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} className="text-black/80" />
                </a>
              </div>
            </div>
            
            <p className="text-black/70">
              I'm currently open to freelance opportunities and collaborations. If you have a project that you want to get started, think you need my help with something, or just want to say hi, then get in touch.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/5"
                placeholder="Abraham Sackey Ohene Gyan"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/5"
                placeholder="abraham@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                placeholder="Hello, I'd like to talk about..."
              />
            </div>
            
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-full font-medium flex items-center hover-lift w-full justify-center"
            >
              Send Message
              <Send size={16} className="ml-2" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
