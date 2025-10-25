import { useState, useEffect, useRef } from 'react';
import { Mail, Send, Github, Linkedin, Loader2 } from 'lucide-react';
import { useToast as useCustomToast } from '@/hooks/useToast.tsx';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { showSuccess, showError, ToastContainer } = useCustomToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use relative path to call the API route on the same domain
      const apiUrl = import.meta.env.VITE_API_URL || '/api/contact';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      setFormState({ name: '', email: '', message: '' });
      showSuccess('Thank you for your message! I will get back to you soon.');
    } catch (error) {
      showError('Something went wrong. Please try again later or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
              className="px-6 py-3 bg-black text-white rounded-full font-medium flex items-center hover-lift w-full justify-center disabled:bg-black/70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
