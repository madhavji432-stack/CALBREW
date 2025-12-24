import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, Copy, Check, Activity, TrendingUp, HelpCircle, ShieldCheck } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const PercentageIncreasePage: React.FC<PageProps> = ({ onNavigate }) => {
  const [oldValue, setOldValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setError('');
    setResult(null);
    if (!oldValue || !newValue) return;
    const oldVal = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    if (isNaN(oldVal) || isNaN(newVal)) return;
    if (oldVal === 0) {
      setError('The old value cannot be zero for percentage calculations.');
      return;
    }
    const increase = ((newVal - oldVal) / Math.abs(oldVal)) * 100;
    setResult(increase);
  }, [oldValue, newValue]);

  const handleReset = () => {
    setOldValue('');
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
      <div className="hidden">
        <h1>Percentage Increase Calculator</h1>
        <p>Calculate percentage increase instantly. Easy, free tool to find the growth rate between two numbers. Perfect for salary, prices, and statistics.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Percentage Increase Calculator
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Instantly calculate the percentage growth between two values. This free tool is perfect for analyzing salary raises, price changes, or investment growth.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="oldVal" className="block text-sm font-bold text-slate-700 mb-2">
                    Old Value
                  </label>
                  <input
                    id="oldVal"
                    type="number"
                    value={oldValue}
                    onChange={(e) => setOldValue(e.target.value)}
                    placeholder="e.g. 50"
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
                    placeholder="e.g. 75"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-lg text-slate-900 placeholder-slate-400 font-medium"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                result !== null ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'
              }`}>
                {/* Fixed minimum height to prevent layout shift */}
                <div className="p-6 md:p-8 text-center min-h-[180px] flex flex-col items-center justify-center">
                  {result !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-green-700 mb-3 uppercase tracking-wider">
                        Percentage Increase
                      </span>
                      
                      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                        <span className={`text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight break-all ${result >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                          {result > 0 ? '+' : ''}{result.toFixed(2)}%
                        </span>
                        <button
                          onClick={copyResult}
                          className="p-2.5 rounded-lg bg-white shadow-sm border border-green-200 text-green-600 hover:bg-green-100 transition-all active:scale-95 flex-shrink-0"
                          title="Copy result"
                        >
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-green-800 font-medium text-sm md:text-base">
                        <TrendingUp className={`w-4 h-4 flex-shrink-0 ${result < 0 ? 'rotate-180 text-red-600' : ''}`} />
                        <p>
                          The value {result >= 0 ? 'increased' : 'decreased'} by {Math.abs(result).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Activity className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium text-sm md:text-base">Enter values above to see the increase</p>
                    </div>
                  )}
                </div>
              </div>

               {(oldValue || newValue) && (
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

            {/* SEO Content Section */}
            <div className="space-y-12">
                
                {/* 1. What is this */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is the Percentage Increase Calculator?</h2>
                    <p className="text-slate-600 leading-relaxed">
                        The Percentage Increase Calculator is a mathematical tool designed to measure the relative growth between two numbers. It calculates how much a value has gone up in proportion to its original starting point. This is commonly used to track progress, inflation, salary hikes, or profit margins over time.
                    </p>
                </section>

                {/* 2. Use Cases */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Uses in Daily Life</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        {[
                            'Calculating salary raises or bonuses',
                            'Tracking stock market portfolio growth',
                            'Measuring inflation impact on prices',
                            'Analyzing website traffic growth',
                            'Checking rent or utility bill increases',
                            'Comparing fitness progress statistics'
                        ].map((use, i) => (
                            <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                <div className="mt-1 bg-green-100 p-1 rounded-full"><TrendingUp className="w-3 h-3 text-green-600" /></div>
                                <span className="text-slate-700 text-sm font-medium">{use}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 3. Benefits */}
                <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Why use this tool?</h2>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700"><strong>Accuracy:</strong> Eliminates manual math errors, especially with decimals.</span>
                        </li>
                        <li className="flex gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700"><strong>Speed:</strong> Get instant results without needing a spreadsheet.</span>
                        </li>
                        <li className="flex gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700"><strong>Clarity:</strong> Distinguishes clearly between "percentage increase" and "percentage point" changes.</span>
                        </li>
                    </ul>
                </section>

                {/* 4. Formula */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Percentage Increase Formula</h2>
                    <p className="text-slate-600 mb-4">The formula to calculate the percentage increase is straightforward:</p>
                    <div className="bg-slate-900 text-white p-6 rounded-xl font-mono text-center shadow-lg mb-6 overflow-x-auto">
                        Percentage Increase = [(New Value - Original Value) / Original Value] × 100
                    </div>
                    <p className="text-slate-600">
                        <strong>Note:</strong> The "Original Value" is always the denominator. If the result is negative, it indicates a percentage decrease.
                    </p>
                </section>

                {/* 5. Example */}
                <section className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Example: Salary Raise</h3>
                    <p className="text-slate-600 mb-4">
                        Imagine your monthly salary was <strong>$4,000</strong> last year, and this year it increased to <strong>$4,500</strong>.
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                        <li><strong>Find the difference:</strong> $4,500 - $4,000 = $500</li>
                        <li><strong>Divide by original:</strong> $500 / $4,000 = 0.125</li>
                        <li><strong>Convert to percent:</strong> 0.125 × 100 = <strong>12.5%</strong></li>
                    </ol>
                    <p className="mt-4 font-semibold text-green-700">Result: You received a 12.5% raise.</p>
                </section>

                {/* 6. FAQ */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Can percentage increase be negative?', a: 'Yes. If the new value is lower than the original value, the result will be negative, which mathematically represents a percentage decrease.' },
                            { q: 'How do I calculate a 10% increase manually?', a: 'Multiply your original number by 0.10 to find the increase amount, then add that to your original number. Or simply multiply the original number by 1.10.' },
                            { q: 'What is the difference between percentage change and percentage difference?', a: 'Percentage change compares an old value to a new value over time. Percentage difference compares two values that are equal in nature (e.g., height of two different people) without a specific direction of change.' },
                            { q: 'Can I calculate percentage increase with zero?', a: 'No. You cannot calculate a percentage increase from zero because you cannot divide by zero. Conceptually, growth from zero to any number is undefined or infinite.' },
                            { q: 'Is a 100% increase doubling the number?', a: 'Yes. A 100% increase means you have added the entire original amount again. For example, 50 to 100 is a 100% increase.' },
                            { q: 'Is this calculator free?', a: 'Yes, CalcBrew tools are 100% free and work directly in your browser without downloading any software.' }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                                <h3 className="font-bold text-slate-900 flex items-start gap-2 mb-2">
                                    <HelpCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 leading-relaxed ml-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Trust & Disclaimer */}
                <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start">
                    <ShieldCheck className="w-8 h-8 text-slate-400 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-slate-900 mb-2">Trust & Privacy</h3>
                        <p className="text-sm text-slate-600 mb-2">
                            This calculator processes all data locally on your device. We do not store or transmit your inputs.
                        </p>
                        <p className="text-xs text-slate-500">
                            <strong>Disclaimer:</strong> While we strive for accuracy, this tool is for informational purposes only. Please double-check critical financial calculations.
                        </p>
                    </div>
                </section>

            </div>

          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-900 mb-4">Related Calculators</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Percentage Decrease Calculator', id: 'calculator-percentage-decrease' },
                  { name: 'Reverse Percentage Calculator', id: 'calculator-reverse-percentage' },
                  { name: 'What Percent of X is Y?', id: 'calculator-what-percent' },
                  { name: 'Average Calculator', id: 'calculator-average' }
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

export default PercentageIncreasePage;