import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, TOOLS } from '../data';

interface CategoriesProps {
  onCategorySelect?: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  
  // Dynamically calculate counts based on the actual TOOLS list
  const categoriesWithCounts = CATEGORIES.map(cat => ({
    ...cat,
    count: TOOLS.filter(tool => tool.category === cat.id).length
  }));

  const handleClick = (id: string) => {
    if (!onCategorySelect) return;
    onCategorySelect(id);
  };

  return (
    <section id="categories" className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Browse by Category</h2>
          <p className="text-slate-600">Find the right tool for your specific needs from our organized collection.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesWithCounts.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleClick(cat.id)}
              className="group relative bg-white rounded-xl p-6 border border-slate-200 hover:border-primary-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <cat.icon className="h-6 w-6" />
                </div>
                <div className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-bold">
                    {cat.count} Tools
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{cat.name}</h3>
              <p className="text-sm text-slate-500 mb-4 h-10">
                 Explore our collection of {cat.name.toLowerCase()} calculators.
              </p>
              
              <div className="flex items-center text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Browse Category <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;