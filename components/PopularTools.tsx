
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data';

interface PopularToolsProps {
  onNavigate?: (view: string) => void;
  activeCategoryProp?: string;
  preview?: boolean;
}

const PopularTools: React.FC<PopularToolsProps> = ({ 
  onNavigate, 
  activeCategoryProp = 'all',
  preview = false 
}) => {
  const [activeCategory, setActiveCategory] = useState(activeCategoryProp);

  useEffect(() => {
    setActiveCategory(activeCategoryProp);
  }, [activeCategoryProp]);

  // If in preview mode, show popular tools only, max 6. Ignore category filter.
  // If in full mode, respect category filter.
  const filteredTools = preview
    ? TOOLS.filter(tool => tool.popular).slice(0, 6)
    : activeCategory === 'all' 
        ? TOOLS 
        : TOOLS.filter(tool => tool.category === activeCategory);

  const handleToolClick = (toolId: string) => {
    if (onNavigate) {
      // Map IDs to View States
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

      const route = toolMap[toolId];
      if (route) {
        onNavigate(route);
      }
    }
  };

  const getCategoryName = (id: string) => {
    return CATEGORIES.find(c => c.id === id)?.name || id;
  };

  return (
    <section id="tools" className={`bg-slate-50 ${preview ? 'py-16 border-b border-slate-200' : 'py-12'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {preview ? 'Popular Calculators' : 'All Calculators'}
            </h2>
            <p className="text-slate-600 text-lg">
              {preview 
                ? 'Our most frequently used tools for everyday tasks.' 
                : `Browse our complete collection of ${TOOLS.length} free tools.`}
            </p>
          </div>
          
          {/* Desktop "View All" Link (Only shown in preview mode) */}
          {preview && (
            <button 
               onClick={() => onNavigate && onNavigate('all-tools')}
               className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              View all calculators <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Filters - ONLY SHOW IN FULL MODE (NOT PREVIEW) */}
        {!preview && (
          <div className="flex flex-wrap gap-3 mb-10">
              <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      activeCategory === 'all'
                          ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/25'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-primary-200 hover:text-primary-600 hover:bg-primary-50'
                  }`}
              >
                  All
              </button>
              {CATEGORIES.map((cat) => (
                  <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                          activeCategory === cat.id
                              ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/25'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-primary-200 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                  >
                      {cat.name}
                  </button>
              ))}
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {getCategoryName(tool.category)}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">{tool.name}</h3>
              <p className="text-slate-600 mb-6 flex-grow leading-relaxed text-sm line-clamp-2">{tool.description}</p>
              
              <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Open Calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          ))}
          
          {!preview && filteredTools.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
                <p className="text-lg font-medium">No calculators found in this category.</p>
            </div>
          )}
        </div>

        {/* Mobile/Tablet Prominent View All Button (Preview Mode Only) */}
        {preview && (
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate && onNavigate('all-tools')}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-slate-900 rounded-xl shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200"
            >
              View All Calculators
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default PopularTools;
