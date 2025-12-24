
import React from 'react';
import { TOOLS, CATEGORIES } from '../data';
import { ArrowRight, FileText, Layers, Wrench } from 'lucide-react';

interface SitemapProps {
  onNavigate: (view: string) => void;
}

const SitemapPage: React.FC<SitemapProps> = ({ onNavigate }) => {
  
  // Mapping logic similar to PopularTools to route correct IDs
  const getRoute = (toolId: string) => {
    const toolMap: Record<string, string> = {
      'percent': 'calculator-percentage-increase',
      'percent-decrease': 'calculator-percentage-decrease',
      'reverse-percent': 'calculator-reverse-percentage',
      'what-percent': 'calculator-what-percent',
      'age-days': 'calculator-age-days',
      'age-weeks': 'calculator-age-weeks',
      'age-months': 'calculator-age-months',
      'date-diff': 'calculator-date-difference',
      'date-time-calc': 'calculator-date-time',
      'time-duration': 'calculator-time-duration',
      'working-days': 'calculator-working-days',
      'bmi': 'calculator-bmi',
      'bmr': 'calculator-bmr',
      'water-intake': 'calculator-water-intake',
      'ideal-weight': 'calculator-ideal-weight',
      'sleep': 'calculator-sleep',
      'loan': 'calculator-loan-emi',
      'simple-interest': 'calculator-simple-interest',
      'compound-interest': 'calculator-compound-interest',
      'investment-growth': 'calculator-investment-growth',
      'quick-tip': 'calculator-quick-tip',
      'average': 'calculator-average',
      'ratio': 'calculator-ratio',
      'fraction': 'calculator-fraction',
      'unit-converter': 'calculator-unit-converter'
    };
    return toolMap[toolId] || 'home';
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Sitemap</h1>
          <p className="text-slate-600">
            An overview of all available tools and pages on CalcBrew.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Main Pages */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg"><Layers className="w-5 h-5 text-slate-600" /></div>
                <h2 className="text-xl font-bold text-slate-900">Main Navigation</h2>
             </div>
             <ul className="space-y-3">
                <li><button onClick={() => onNavigate('home')} className="hover:text-primary-600 text-slate-600">Home</button></li>
                <li><button onClick={() => onNavigate('all-tools')} className="hover:text-primary-600 text-slate-600">All Tools</button></li>
             </ul>

             <div className="flex items-center gap-3 mb-6 mt-10">
                <div className="p-2 bg-slate-100 rounded-lg"><FileText className="w-5 h-5 text-slate-600" /></div>
                <h2 className="text-xl font-bold text-slate-900">Company & Legal</h2>
             </div>
             <ul className="space-y-3">
                <li><button onClick={() => onNavigate('about')} className="hover:text-primary-600 text-slate-600">About Us</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-primary-600 text-slate-600">Contact</button></li>
                <li><button onClick={() => onNavigate('careers')} className="hover:text-primary-600 text-slate-600">Careers</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-primary-600 text-slate-600">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('terms')} className="hover:text-primary-600 text-slate-600">Terms of Service</button></li>
                <li><button onClick={() => onNavigate('cookies')} className="hover:text-primary-600 text-slate-600">Cookie Policy</button></li>
             </ul>
          </div>

          {/* Tools by Category - Spanning 2 columns */}
          <div className="md:col-span-1 lg:col-span-2 space-y-8">
            {CATEGORIES.map(category => {
               const categoryTools = TOOLS.filter(t => t.category === category.id);
               return (
                <div key={category.id} className="bg-white p-8 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                            <category.icon className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">{category.name} Calculators</h2>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                        {categoryTools.map(tool => (
                            <li key={tool.id}>
                                <button 
                                    onClick={() => onNavigate(getRoute(tool.id))}
                                    className="text-left text-slate-600 hover:text-primary-600 text-sm flex items-start gap-2 group w-full"
                                >
                                    <ArrowRight className="w-4 h-4 mt-0.5 text-slate-300 group-hover:text-primary-600 flex-shrink-0" />
                                    {tool.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
               );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
