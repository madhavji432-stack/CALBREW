import React, { useState, useEffect } from 'react';
import { ArrowRight, Calculator, HelpCircle, ShieldCheck, DollarSign, Calendar } from 'lucide-react';

interface PageProps { onNavigate?: (view: string) => void; }

const SimpleInterestPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    if(p && r && t) setResult((p * r * t) / 100);
    else setResult(null);
  }, [principal, rate, time]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
          <h1>Simple Interest Calculator</h1>
          <p>Calculate simple interest and final accumulated amount. Free financial tool for loans and savings.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple Interest Calculator</h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">Calculate the interest earned or paid on a principal amount over time, without compounding.</p>
          </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
         <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8 space-y-12">
                 {/* Calculator */}
                 <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Principal Amount ($)</label>
                            <input type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none" placeholder="1000" value={principal} onChange={e => setPrincipal(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Annual Rate (%)</label>
                                <input type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none" placeholder="5" value={rate} onChange={e => setRate(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Time (Years)</label>
                                <input type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none" placeholder="2" value={time} onChange={e => setTime(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    
                    <div className={`p-6 rounded-lg text-center border transition-all ${result !== null ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100'}`}>
                        {result !== null ? (
                            <>
                                <span className="block text-xs text-indigo-500 uppercase font-bold mb-2">Total Interest</span>
                                <span className="text-4xl font-bold text-primary-600 block mb-2">${result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                <p className="text-slate-700 font-medium border-t border-indigo-200 pt-3 mt-3">
                                    Total Amount: <span className="font-bold">${(parseFloat(principal) + result).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </p>
                            </>
                        ) : (
                             <div className="text-slate-400 py-4">
                                <Calculator className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Enter values to calculate interest</p>
                             </div>
                        )}
                    </div>
                 </div>

                 {/* SEO Content */}
                 <div className="space-y-12">
                     <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Simple Interest?</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Simple Interest is a quick method of calculating the interest charge on a loan or the interest earned on a deposit. Unlike compound interest, simple interest is determined only by the original capital (principal) amount. Interest does not accumulate on previously earned interest.
                        </p>
                     </section>

                     <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Use Cases</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Short-term personal loans',
                                'Car loans (some structures)',
                                'Certificate of Deposits (CDs)',
                                'Discounted bonds',
                                'Promissory notes',
                                'Checking account interest'
                            ].map((use, i) => (
                                <li key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 text-slate-700 font-medium text-sm">
                                    <DollarSign className="w-4 h-4 text-green-600" /> {use}
                                </li>
                            ))}
                        </ul>
                     </section>

                     <section>
                         <h2 className="text-2xl font-bold text-slate-900 mb-4">Simple Interest Formula</h2>
                         <div className="bg-slate-900 text-white p-6 rounded-xl font-mono text-center shadow-lg mb-6 overflow-x-auto">
                            A = P (1 + rt)
                         </div>
                         <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
                             <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                 <strong>A</strong> = Total Accrued Amount (Principal + Interest)
                             </div>
                             <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                 <strong>P</strong> = Principal Amount
                             </div>
                             <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                 <strong>r</strong> = Annual Interest Rate (decimal)
                             </div>
                             <div className="bg-slate-50 p-3 rounded border border-slate-200 col-span-full sm:col-span-1">
                                 <strong>t</strong> = Time Period (years)
                             </div>
                         </div>
                     </section>

                     <section className="bg-white rounded-xl border border-slate-200 p-6">
                         <h3 className="text-lg font-bold text-slate-900 mb-3">Calculation Example</h3>
                         <p className="text-slate-600 mb-4">
                             You lend a friend <strong>$5,000</strong> at an annual interest rate of <strong>3%</strong> for <strong>2 years</strong>.
                         </p>
                         <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                             <li><strong>Interest:</strong> $5,000 × 0.03 × 2 = $300</li>
                             <li><strong>Total Amount:</strong> $5,000 + $300 = $5,300</li>
                         </ol>
                     </section>

                     <section>
                         <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                         <div className="space-y-4">
                             {[
                                 { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any accumulated interest. Compound interest grows much faster over time.' },
                                 { q: 'Is simple interest better for borrowers?', a: 'Generally, yes. Since you are not paying interest on interest, the total amount paid back is usually lower compared to compound interest loans.' },
                                 { q: 'How do I convert months to years for the formula?', a: 'Divide the number of months by 12. For example, 18 months is 1.5 years.' },
                                 { q: 'Do banks use simple interest?', a: 'Most savings accounts and credit cards use compound interest. However, some auto loans and short-term personal loans may use simple interest.' },
                                 { q: 'Can interest rates be negative?', a: 'In rare economic conditions (central bank policies), rates can be negative, but for consumer loans and savings, rates are almost always positive.' },
                                 { q: 'Is this calculator free?', a: 'Yes, CalcBrew tools are 100% free and work instantly in your browser.' }
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
                                 This tool is for educational purposes. Actual financial products may include fees, taxes, or varying terms not captured here.
                             </p>
                         </div>
                     </section>
                 </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Related Calculators</h3>
                    <ul className="space-y-3">
                        <button onClick={() => onNavigate && onNavigate('calculator-compound-interest')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Compound Interest
                        </button>
                        <button onClick={() => onNavigate && onNavigate('calculator-loan-emi')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Loan Calculator
                        </button>
                        <button onClick={() => onNavigate && onNavigate('calculator-investment-growth')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Investment Growth
                        </button>
                    </ul>
                 </div>
            </div>

         </div>
      </div>
    </div>
  );
};
export default SimpleInterestPage;