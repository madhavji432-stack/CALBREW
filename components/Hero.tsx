import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Users, ChevronUp, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  // Simple state for the mock calculator to make it alive
  const [bill, setBill] = useState<string>('');
  const [tip, setTip] = useState<number>(20);
  const [showDetails, setShowDetails] = useState(false);

  const billAmount = parseFloat(bill) || 0;
  const tipAmount = billAmount * (tip / 100);
  const total = billAmount + tipAmount;

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-28 lg:pb-32 bg-white/50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-6 border border-primary-100 tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              AI-Powered Accuracy
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight lg:leading-[1.1]">
              Smart Calculators for <span className="text-primary-600">Everyday Life</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Fast, accurate, and easy-to-use tools for health, finance, and daily needs. Join 50,000+ users.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary-600 rounded-xl shadow-glow hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto">
                Try Free Calculators
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm transition-all duration-200 w-full sm:w-auto">
                View All Tools
              </button>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                <span>No signup needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Mockup */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl perspective-1000 mt-8 lg:mt-0">
            {/* Ambient Background Blobs */}
            <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-72 sm:h-72 bg-primary-100/80 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 sm:w-72 sm:h-72 bg-purple-100/80 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            {/* Calculator Card */}
            <div className="relative bg-white rounded-3xl shadow-soft border border-slate-100 p-5 sm:p-8 transform transition-transform hover:scale-[1.01] duration-300 w-full">
              <div className="flex justify-between items-center mb-6 sm:mb-8 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 text-lg">Quick Tip</h3>
                      <p className="text-xs text-slate-500">Finance Tool</p>
                   </div>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bill Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input 
                      type="number" 
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-xl font-medium placeholder:text-slate-300 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Tip Percentage</label>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {[15, 18, 20, 25].map((p) => (
                      <button
                        key={p}
                        onClick={() => setTip(p)}
                        className={`py-2.5 rounded-lg text-sm font-bold transition-all border ${
                          tip === p 
                            ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-500/25' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700'
                        }`}
                      >
                        {p}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 mt-6 text-white shadow-lg shadow-slate-900/10 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2 opacity-80">
                    <span className="text-sm font-medium">Tip Amount</span>
                    <span className="font-medium">${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-3xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  {/* Detailed Breakdown Section */}
                  <div className={`grid transition-all duration-300 ease-in-out ${showDetails ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-slate-700' : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'}`}>
                     <div className="overflow-hidden">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-slate-800 rounded-lg p-2">
                                <div className="flex items-center justify-center gap-1 mb-1 text-slate-400 text-xs uppercase font-bold">
                                    <Users className="w-3 h-3" /> 2
                                </div>
                                <div className="font-bold text-lg">${(total / 2).toFixed(2)}</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-2">
                                <div className="flex items-center justify-center gap-1 mb-1 text-slate-400 text-xs uppercase font-bold">
                                    <Users className="w-3 h-3" /> 3
                                </div>
                                <div className="font-bold text-lg">${(total / 3).toFixed(2)}</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-2">
                                <div className="flex items-center justify-center gap-1 mb-1 text-slate-400 text-xs uppercase font-bold">
                                    <Users className="w-3 h-3" /> 4
                                </div>
                                <div className="font-bold text-lg">${(total / 4).toFixed(2)}</div>
                            </div>
                        </div>
                     </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 mt-2 py-2 group"
                >
                  {showDetails ? 'Hide breakdown' : 'View detailed breakdown'}
                  {showDetails ? (
                    <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;