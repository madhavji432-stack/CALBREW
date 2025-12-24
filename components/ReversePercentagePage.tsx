import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCcw, Copy, Check, TrendingUp, TrendingDown, Info, ArrowRight } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const ReversePercentagePage: React.FC<PageProps> = ({ onNavigate }) => {
  const [finalValue, setFinalValue] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [calcType, setCalcType] = useState<'increase' | 'decrease'>('increase');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ finalValue?: string; percentage?: string }>({});
  const [copied, setCopied] = useState(false);

  // Real-time calculation effect
  useEffect(() => {
    const newErrors: { finalValue?: string; percentage?: string } = {};
    let hasError = false;

    // Reset result initially
    setResult(null);

    // If both empty, just clear errors and return (placeholder state)
    if (!finalValue && !percentage) {
      setErrors({});
      return;
    }

    const finalVal = parseFloat(finalValue);
    const pct = parseFloat(percentage);

    // Validate inputs generally (check if they are valid numbers provided something is typed)
    if (finalValue && isNaN(finalVal)) {
       // Usually caught by input type="number", but good for safety
    }

    // Check constraints if percentage is provided
    if (percentage) {
        if (pct < 0) {
            newErrors.percentage = "Percentage cannot be negative";
            hasError = true;
        } else if (calcType === 'decrease' && pct >= 100) {
            newErrors.percentage = "Decrease must be less than 100%";
            hasError = true;
        }
    }

    setErrors(newErrors);

    if (hasError || !finalValue || !percentage || isNaN(finalVal) || isNaN(pct)) {
      return;
    }

    // Calculation Logic
    let original = 0;
    if (calcType === 'increase') {
      // Formula: Final / (1 + P/100)
      original = finalVal / (1 + pct / 100);
    } else {
      // Formula: Final / (1 - P/100)
      original = finalVal / (1 - pct / 100);
    }

    setResult(original);

  }, [finalValue, percentage, calcType]);

  const handleReset = () => {
    setFinalValue('');
    setPercentage('');
    setResult(null);
    setErrors({});
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toFixed(2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. SEO METADATA (Simulated) */}
      <div className="hidden">
        <h1>Reverse Percentage Calculator</h1>
        <p>Easily calculate the original value before a percentage increase or decrease. Free tool for finding prices before tax, discounts, or salary raises.</p>
      </div>

      {/* 2. PAGE HERO / INTRO */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Reverse Percentage Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Find the original number before a percentage change occurred. Useful for calculating prices before sales tax, finding the original price before a discount, or determining a pre-raise salary.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 3. CALCULATOR UI SECTION */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              
              {/* Type Selector */}
              <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
                <button
                  onClick={() => setCalcType('increase')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-md transition-all ${
                    calcType === 'increase'
                      ? 'bg-white text-primary-600 shadow-sm ring-1 ring-black/5'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Was Increased By
                </button>
                <button
                  onClick={() => setCalcType('decrease')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-md transition-all ${
                    calcType === 'decrease'
                      ? 'bg-white text-primary-600 shadow-sm ring-1 ring-black/5'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  <TrendingDown className="w-4 h-4" />
                  Was Decreased By
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="finalVal" className="block text-sm font-bold text-slate-700 mb-2">
                    Final Value
                  </label>
                  <div className="relative">
                    <input
                      id="finalVal"
                      type="number"
                      value={finalValue}
                      onChange={(e) => setFinalValue(e.target.value)}
                      placeholder="e.g. 120"
                      className={`w-full px-4 py-4 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all text-xl text-slate-900 placeholder-slate-400 font-medium ${
                        errors.finalValue 
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent'
                      }`}
                    />
                  </div>
                  {errors.finalValue && (
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.finalValue}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="pct" className="block text-sm font-bold text-slate-700 mb-2">
                    Percentage (%)
                  </label>
                  <div className="relative">
                    <input
                      id="pct"
                      type="number"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="e.g. 20"
                      className={`w-full px-4 py-4 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all text-xl text-slate-900 placeholder-slate-400 font-medium ${
                        errors.percentage 
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-slate-200 focus:ring-2 focus:ring-primary-600 focus:border-transparent'
                      }`}
                    />
                  </div>
                  {errors.percentage && (
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.percentage}
                    </div>
                  )}
                </div>
              </div>

              {/* Result Area - Always Visible */}
              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                result !== null 
                  ? 'bg-primary-50 border-primary-100' 
                  : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-6 md:p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                  
                  {/* Case 1: Result */}
                  {result !== null && Object.keys(errors).length === 0 && (
                    <div className="w-full animate-in zoom-in-95 duration-300">
                      <span className="block text-xs font-bold text-primary-600 mb-3 uppercase tracking-wider">
                        Original Value
                      </span>
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <span className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
                          {result.toFixed(2)}
                        </span>
                        <button
                          onClick={copyResult}
                          className="p-2.5 rounded-lg bg-white shadow-sm border border-primary-100 text-slate-400 hover:text-primary-600 hover:border-primary-300 transition-all active:scale-95"
                          title="Copy result"
                        >
                          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-slate-600 text-sm">
                        The value before the <span className="font-semibold text-slate-900">{percentage}% {calcType === 'increase' ? 'increase' : 'decrease'}</span>.
                      </p>
                    </div>
                  )}

                  {/* Case 2: Placeholder (Empty or Error) */}
                  {result === null && (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Info className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium">
                        {Object.keys(errors).length > 0 
                          ? 'Please fix the errors above' 
                          : 'Enter values above to see the result instantly'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reset Button (Optional/Secondary now) */}
              {(finalValue || percentage) && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2 px-4 rounded-lg hover:bg-slate-100"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Reset Calculator
                  </button>
                </div>
              )}
            </div>

            {/* 4. HOW IT WORKS SECTION */}
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  Reverse percentage calculations involve working backwards from a final number to find the original amount.
                </p>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">1</span>
                    <p className="text-slate-700"><span className="font-semibold">Identify the change:</span> Determine if the final number resulted from an increase (like tax) or a decrease (like a discount).</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">2</span>
                    <p className="text-slate-700"><span className="font-semibold">Convert percentage:</span> Divide the percentage by 100 to get a decimal.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">3</span>
                    <p className="text-slate-700"><span className="font-semibold">Divide:</span> Divide the final value by (1 + decimal) for increases, or (1 - decimal) for decreases.</p>
                  </li>
                </ol>
              </div>
            </section>

            {/* 5. FORMULA SECTION */}
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Reverse Percentage Formulas</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary-600" />
                        For Percentage Increase
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center mb-2 overflow-x-auto">
                        <code className="text-sm md:text-base font-mono text-slate-800 whitespace-nowrap">
                        Original = Final ÷ (1 + Percentage ÷ 100)
                        </code>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        For Percentage Decrease
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center mb-2 overflow-x-auto">
                        <code className="text-sm md:text-base font-mono text-slate-800 whitespace-nowrap">
                        Original = Final ÷ (1 - Percentage ÷ 100)
                        </code>
                    </div>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="block font-semibold text-slate-900 mb-1">Final Value</span>
                  The number you have now (after the change).
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="block font-semibold text-slate-900 mb-1">Percentage</span>
                  The rate of increase or decrease applied.
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="block font-semibold text-slate-900 mb-1">Original Value</span>
                  The starting number you want to find.
                </div>
              </div>
            </section>

            {/* 6. EXAMPLE CALCULATIONS */}
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Example Calculations</h2>
              
              <div className="space-y-6">
                {/* Example 1 */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">Example 1: Finding Price Before Tax (Increase)</h3>
                  <p className="text-slate-600 mb-4">
                    You paid <strong>$110</strong> for a pair of shoes, which included <strong>10%</strong> sales tax. What was the price before tax?
                  </p>
                  <div className="space-y-1 text-slate-700 font-mono text-sm border-t border-slate-200 pt-3">
                    <p>1. Convert 10% to decimal: 10 ÷ 100 = 0.10</p>
                    <p>2. Add 1 to decimal: 1 + 0.10 = 1.10</p>
                    <p>3. Divide Final by 1.10: 110 ÷ 1.10 = <span className="font-bold text-primary-700">100</span></p>
                  </div>
                  <p className="mt-3 text-slate-900 font-medium">Answer: The original price was $100.</p>
                </div>

                {/* Example 2 */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3">Example 2: Finding Original Price Before Discount (Decrease)</h3>
                  <p className="text-slate-600 mb-4">
                    A jacket is on sale for <strong>$80</strong> after a <strong>20%</strong> discount. What was the original price?
                  </p>
                  <div className="space-y-1 text-slate-700 font-mono text-sm border-t border-slate-200 pt-3">
                    <p>1. Convert 20% to decimal: 20 ÷ 100 = 0.20</p>
                    <p>2. Subtract from 1: 1 - 0.20 = 0.80</p>
                    <p>3. Divide Final by 0.80: 80 ÷ 0.80 = <span className="font-bold text-primary-700">100</span></p>
                  </div>
                  <p className="mt-3 text-slate-900 font-medium">Answer: The original price was $100.</p>
                </div>
              </div>
            </section>

            {/* 7. USE CASES SECTION */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Use Cases</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Pre-Tax Prices', desc: 'Removing VAT or sales tax from a total receipt amount to see the base cost.' },
                  { title: 'Original Discount Price', desc: 'Finding out how much an item cost before it went on sale.' },
                  { title: 'Salary Analysis', desc: 'Calculating your base salary before a performance raise or bonus was added.' },
                  { title: 'Business Markups', desc: 'Determining the wholesale cost of a product based on its retail price and markup margin.' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. FAQ SECTION */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'What is reverse percentage?', a: 'Reverse percentage is a mathematical method used to calculate the original number before a percentage increase or decrease was applied.' },
                  { q: 'How do you calculate the original value from a percentage?', a: 'Divide the final number by (1 + rate) for increases, or (1 - rate) for decreases, where the rate is the percentage divided by 100.' },
                  { q: 'What is the difference between reverse percentage and percentage increase?', a: 'Percentage increase finds the NEW value after growth. Reverse percentage works backward to find the OLD value before growth.' },
                  { q: 'Can this calculator be used for discounts?', a: 'Yes! Select "Was Decreased By" to find the original price of an item before a discount was applied.' },
                  { q: 'Is this reverse percentage calculator free?', a: 'Yes, this tool is completely free to use, works on mobile, and requires no downloads.' }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">{faq.q}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* 9. INTERNAL LINKING SECTION */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Related Calculators</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Percentage Increase Calculator', id: 'calculator-percentage-increase' },
                  { name: 'Percentage Decrease Calculator', id: 'calculator-percentage-decrease' },
                  { name: 'What Percent of X is Y?', id: '#' },
                  { name: 'Average Calculator', id: '#' },
                  { name: 'Sales Tax Calculator', id: '#' }
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

            {/* 10. TRUST & USABILITY NOTES */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-4">Why use CalcBrew?</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>No Data Storage:</strong> Calculations happen in your browser.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Instant Results:</strong> Fast and accurate formulas.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Works Worldwide:</strong> Compatible with any currency.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReversePercentagePage;