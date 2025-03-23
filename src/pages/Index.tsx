
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize scroll reveal
    const initScrollReveal = () => {
      const revealElements = document.querySelectorAll('.scroll-section');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      revealElements.forEach((element) => {
        observer.observe(element);
      });
    };

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Initialize scroll reveal after loading
      setTimeout(initScrollReveal, 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10 selection:text-black">
      {/* Page loader */}
      {loading && (
        <div className="loader">
          <div className="loader-content">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
