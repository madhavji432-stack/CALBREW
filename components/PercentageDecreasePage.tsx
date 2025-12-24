import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, Copy, Check, Activity, TrendingDown } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const PercentageDecreasePage: React.FC<PageProps> = ({ onNavigate }) => {
  const [originalValue, setOriginalValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Live Calculation Logic
  useEffect(() => {
    setError('');
    setResult(null);

    if (!originalValue || !newValue) return;

    const origVal = parseFloat(originalValue);
    const newVal = parseFloat(newValue);

    if (isNaN(origVal) || isNaN(newVal)) return;

    if (origVal === 0) {
      setError('The original value cannot be zero for percentage calculations.');
      return;
    }

    // Formula: ((Original - New) / Original) * 100
    const decrease = ((origVal - newVal) / Math.abs(origVal)) * 100;
    setResult(decrease);
  }, [originalValue, newValue]);

  const handleReset = () => {
    setOriginalValue('');
    setNewValue('');
    setResult(null);
    setError('');
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(`${result.toFixed(2)}%`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 sm:pb-20">
      {/* SEO Metadata */}
      <div className="hidden">
        <h1>Percentage Decrease Calculator</h1>
        <p>Calculate the percentage drop between two numbers instantly. Free online tool for discounts, sales, and price drops.</p>
      </div>

      {/* Page Hero */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Percentage Decrease Calculator
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Quickly calculate the percentage difference when a value drops. This tool is essential for working out discounts, analyzing cost reductions, or measuring sales decline.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            {/* Calculator UI Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="origVal" className="block text-sm font-bold text-slate-700 mb-2">
                    Original Value
                  </label>
                  <input
                    id="origVal"
                    type="number"
                    value={originalValue}
                    onChange={(e) => setOriginalValue(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-lg text-slate-900 placeholder-slate-400 font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="newVal" className="block text-sm font-bold text-slate-700 mb-2">
                    New Value
                  </label>
                  <input
                    id="newVal"
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g. 80"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-lg text-slate-900 placeholder-slate-400 font-medium"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Live Result Box */}
              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                result !== null ? 'bg-primary-50 border-primary-200' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-6 md:p-8 text-center min-h-[160px] md:min-h-[180px] flex flex-col items-center justify-center">
                  {result !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-primary-700 mb-3 uppercase tracking-wider">
                        Percentage Decrease
                      </span>
                      
                      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                        <span className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight break-all ${result >= 0 ? 'text-primary-600' : 'text-slate-600'}`}>
                          {result.toFixed(2)}%
                        </span>
                        <button
                          onClick={copyResult}
                          className="p-2.5 rounded-lg bg-white shadow-sm border border-primary-200 text-primary-600 hover:bg-primary-100 transition-all active:scale-95 flex-shrink-0"
                          title="Copy result"
                        >
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-primary-800 font-medium text-sm md:text-base">
                        <TrendingDown className={`w-4 h-4 flex-shrink-0 ${result < 0 ? 'rotate-180' : ''}`} />
                        <p>
                          The value decreased by {result.toFixed(2)}%
                          {result < 0 && <span className="block text-xs mt-1 text-slate-500 font-normal">(Negative decrease means an increase)</span>}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Activity className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium text-sm md:text-base">Enter values above to see the decrease</p>
                    </div>
                  )}
                </div>
              </div>

               {/* Reset Button */}
               {(originalValue || newValue) && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2 px-4 rounded-lg hover:bg-slate-100"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Reset Calculation
                  </button>
                </div>
              )}
            </div>

            {/* How It Works Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">How to Calculate Percentage Decrease</h2>
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Percentage decrease measures how much a number has gone down relative to its initial value. It's often used to calculate discounts or losses.
                </p>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">1</span>
                    <p className="text-slate-700 text-sm md:text-base"><span className="font-semibold">Find the difference:</span> Subtract the new value from the original value.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">2</span>
                    <p className="text-slate-700 text-sm md:text-base"><span className="font-semibold">Divide:</span> Take that difference and divide it by the original value.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">3</span>
                    <p className="text-slate-700 text-sm md:text-base"><span className="font-semibold">Convert:</span> Multiply by 100 to get the percentage.</p>
                  </li>
                </ol>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Related Calculators */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-900 mb-4">Related Calculators</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Percentage Increase Calculator', id: 'calculator-percentage-increase' },
                  { name: 'Reverse Percentage Calculator', id: 'calculator-reverse-percentage' },
                  { name: 'Reverse Percentage Calculator', id: '#' },
                  { name: 'What Percent of X is Y?', id: '#' },
                  { name: 'Average Calculator', id: '#' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate && link.id.startsWith('calculator') ? onNavigate(link.id) : null}
                      className={`flex items-center text-left text-slate-600 transition-colors group ${onNavigate && link.id.startsWith('calculator') ? 'hover:text-primary-600 cursor-pointer' : 'cursor-default hover:text-slate-800'}`}
                    >
                      <ArrowRight className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary-600" />
                      <span className="text-sm font-medium">{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageDecreasePage;