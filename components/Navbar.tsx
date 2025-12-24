
import React, { useState, useEffect } from 'react';
import { Menu, X, Calculator } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const navLinks = [
    { name: 'Home', view: 'home' },
    { name: 'Tools', view: 'all-tools' }, // Direct navigation to All Tools
    { name: 'Categories', view: 'all-tools' }, // Categories now also points to All Tools (where filters are)
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm' 
          : 'bg-white/0 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <div className="bg-primary-600 p-1.5 md:p-2 rounded-xl shadow-lg shadow-primary-600/20">
              <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900">CalcBrew</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.view}`}
                onClick={(e) => handleNavClick(e, link.view)}
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-900 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl absolute w-full left-0 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.view}`}
                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-xl transition-colors"
                onClick={(e) => handleNavClick(e, link.view)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
