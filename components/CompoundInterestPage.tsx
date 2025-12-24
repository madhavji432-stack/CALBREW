import React, { useState, useEffect } from 'react';
import { ArrowRight, DollarSign, HelpCircle, ShieldCheck, TrendingUp } from 'lucide-react';

interface PageProps { onNavigate?: (view: string) => void; }

const CompoundInterestPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [frequency, setFrequency] = useState('12'); // Monthly default
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(frequency);

    if (p > 0 && r >= 0 && t > 0 && n > 0) {
      const amount = p * Math.pow((1 + (r/n)), (n*t));
      setResult(amount);
    } else {
      setResult(null);
    }
  }, [principal, rate, years, frequency]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Compound Interest Calculator</h1>
        <p>Calculate compound interest with monthly, quarterly, or yearly frequency. Visualize how your money grows over time.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Compound Interest Calculator</h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">See the power of compound interest and how your money grows exponentially over time.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Principal ($)</label>
                  <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 outline-none" placeholder="1000" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Annual Rate (%)</label>
                  <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 outline-none" placeholder="5" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Time (Years)</label>
                  <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 outline-none" placeholder="10" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Compounding Frequency</label>
                  <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-600 outline-none">
                    <option value="1">Annually (1x/yr)</option>
                    <option value="4">Quarterly (4x/yr)</option>
                    <option value="12">Monthly (12x/yr)</option>
                    <option value="365">Daily (365x/yr)</option>
                  </select>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 text-center">
                 <h3 className="text-xs font-bold text-indigo-600 uppercase mb-2">Future Value</h3>
                 <div className="text-5xl font-bold text-slate-900 tracking-tight">
                    {result ? `$${result.toLocaleString(undefined, {maximumFractionDigits: 2})}` : '$0.00'}
                 </div>
                 {result && (
                     <p className="text-slate-500 mt-2">
                         Total Interest Earned: <span className="font-semibold text-green-600">+${(result - parseFloat(principal)).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                     </p>
                 )}
              </div>
            </div>

            {/* SEO Content */}
            <div className="space-y-12">
                     <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Compound Interest?</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Compound interest is often called the "eighth wonder of the world". It is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. In simple terms, you earn "interest on interest", causing your wealth to grow faster over time.
                        </p>
                     </section>

                     <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">The Formula</h2>
                        <div className="bg-slate-900 text-white p-6 rounded-xl font-mono text-center shadow-lg mb-6 overflow-x-auto">
                           A = P (1 + r/n) ^ (nt)
                        </div>
                        <ul className="text-sm text-slate-600 grid sm:grid-cols-2 gap-2">
                            <li><strong>P</strong> = Principal amount</li>
                            <li><strong>r</strong> = Annual interest rate (decimal)</li>
                            <li><strong>n</strong> = Times compounded per year</li>
                            <li><strong>t</strong> = Number of years</li>
                        </ul>
                     </section>

                     <section className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Compounding Example</h3>
                        <p className="text-slate-600 mb-4">
                            You invest <strong>$10,000</strong> at <strong>5%</strong> for <strong>10 years</strong>.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-700">
                            <li><strong>Simple Interest:</strong> You would earn $5,000. Total: $15,000.</li>
                            <li><strong>Compounded Annually:</strong> You earn $6,288. Total: $16,288.</li>
                            <li><strong>Difference:</strong> Compounding added an extra $1,288 for free!</li>
                        </ul>
                     </section>

                     <section>
                         <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                         <div className="space-y-4">
                             {[
                                 { q: 'What is the Rule of 72?', a: 'It is a shortcut to estimate how long it takes to double your money. Divide 72 by your interest rate (e.g., 72 / 8% = 9 years).' },
                                 { q: 'Why does frequency matter?', a: 'More frequent compounding (daily vs annually) means interest is added to your principal more often, resulting in slightly higher returns.' },
                                 { q: 'APR vs APY?', a: 'APR is the simple annual rate. APY (Annual Percentage Yield) includes the effect of compounding, making it the true indicator of earnings.' },
                                 { q: 'Is this calculator free?', a: 'Yes, completely free.' }
                             ].map((faq, i) => (
                                 <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
                                     <h3 className="font-bold text-slate-900 flex items-start gap-2 mb-2">
                                         <HelpCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                         {faq.q}
                                     </h3>
                                     <p className="text-slate-600 ml-7">{faq.a}</p>
                                 </div>
                             ))}
                         </div>
                     </section>

                     <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-start gap-4">
                         <ShieldCheck className="w-8 h-8 text-slate-400 flex-shrink-0" />
                         <div>
                             <h3 className="font-bold text-slate-900 mb-2">Disclaimer</h3>
                             <p className="text-sm text-slate-600">
                                 Results are estimates. Actual returns vary due to taxes, fees, and economic factors.
                             </p>
                         </div>
                     </section>
                </div>

          </div>

          <div className="lg:col-span-4">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <h3 className="font-bold mb-4 text-slate-900">Related Tools</h3>
               <button onClick={() => onNavigate && onNavigate('calculator-simple-interest')} className="flex items-center w-full mb-3 text-slate-600 hover:text-primary-600">
                  <ArrowRight className="w-4 h-4 mr-2" /> Simple Interest
               </button>
               <button onClick={() => onNavigate && onNavigate('calculator-investment-growth')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                  <ArrowRight className="w-4 h-4 mr-2" /> Investment Growth
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompoundInterestPage;