
import React from 'react';
import { Calculator } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer" 
              onClick={(e) => handleLinkClick(e, 'home')}
            >
              <div className="bg-primary-600 p-1.5 rounded-lg">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900">CalcBrew</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs text-center md:text-left">
              Making complex calculations simple for everyone, everywhere.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-primary-600">About</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-primary-600">Contact</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'careers')} className="hover:text-primary-600">Careers</button></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-primary-600">Privacy Policy</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-primary-600">Terms of Service</button></li>
                <li><button onClick={(e) => handleLinkClick(e, 'cookies')} className="hover:text-primary-600">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} CalcBrew Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button onClick={(e) => handleLinkClick(e, 'sitemap')} className="text-sm text-slate-400 hover:text-slate-600">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
