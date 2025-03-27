
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 border-t border-black/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-display font-semibold">
              ASOG<span className="text-black">.</span>
            </a>
            <p className="text-sm text-black/60 mt-2">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="text-black/80" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
