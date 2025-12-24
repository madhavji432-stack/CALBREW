import React, { useState, useEffect } from 'react';
import { ArrowRight, DollarSign, TrendingUp, HelpCircle, ShieldCheck } from 'lucide-react';
interface PageProps { onNavigate?: (view: string) => void; }

const InvestmentGrowthPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const p = parseFloat(initial) || 0;
    const pmt = parseFloat(monthly) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (r && n) {
        // FV = P(1+r)^n + PMT * (((1+r)^n - 1) / r)
        const fv = p * Math.pow(1 + r, n) + (pmt * (Math.pow(1 + r, n) - 1)) / r;
        setTotal(fv);
    } else {
        setTotal(null);
    }
  }, [initial, monthly, rate, years]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Investment Growth Calculator</h1>
        <p>Calculate future investment value with monthly contributions and annual return. Free SIP and growth calculator.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Investment Growth Calculator</h1>
          <p className="text-slate-600">Project your wealth with monthly contributions and compound interest.</p>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
         <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8 space-y-12">
                {/* Calculator */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="font-bold text-sm text-slate-700">Initial Deposit ($)</label><input type="number" className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-600 outline-none" placeholder="1000" value={initial} onChange={e => setInitial(e.target.value)} /></div>
                        <div><label className="font-bold text-sm text-slate-700">Monthly Contribution ($)</label><input type="number" className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-600 outline-none" placeholder="200" value={monthly} onChange={e => setMonthly(e.target.value)} /></div>
                        <div><label className="font-bold text-sm text-slate-700">Annual Return (%)</label><input type="number" className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-600 outline-none" placeholder="7" value={rate} onChange={e => setRate(e.target.value)} /></div>
                        <div><label className="font-bold text-sm text-slate-700">Years to Grow</label><input type="number" className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-600 outline-none" placeholder="10" value={years} onChange={e => setYears(e.target.value)} /></div>
                    </div>
                    
                    <div className={`p-6 rounded-lg text-center border transition-all ${total !== null ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'}`}>
                        {total !== null ? (
                            <>
                                <span className="block text-xs text-green-600 uppercase font-bold mb-2">Future Value</span>
                                <span className="text-4xl font-bold text-green-800">${total.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                                <p className="text-slate-600 mt-2 text-sm">
                                    Total Invested: <strong>${(parseFloat(initial||'0') + parseFloat(monthly||'0')*parseFloat(years||'0')*12).toLocaleString()}</strong>
                                </p>
                            </>
                        ) : (
                             <div className="text-slate-400 py-4">
                                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Enter investment details</p>
                             </div>
                        )}
                    </div>
                </div>

                {/* SEO Content */}
                <div className="space-y-12">
                     <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Investment Growth?</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Investment growth refers to the increase in the value of an asset or portfolio over time. By combining an initial lump sum with regular monthly contributions and compound interest, your money can grow exponentially. This calculator helps you simulate scenarios for retirement, buying a home, or building long-term wealth.
                        </p>
                     </section>

                     <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Investment Scenarios</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Retirement planning (401k/IRA)',
                                'Saving for a child’s education',
                                'Building a down payment for a house',
                                'Stock market index fund projection',
                                'FIRE (Financial Independence) goals'
                            ].map((use, i) => (
                                <li key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 text-slate-700 font-medium text-sm">
                                    <DollarSign className="w-4 h-4 text-green-600" /> {use}
                                </li>
                            ))}
                        </ul>
                     </section>

                     <section>
                         <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                         <div className="space-y-4">
                             {[
                                 { q: 'What is a realistic annual return rate?', a: 'Historically, the S&P 500 has averaged about 7-10% annually after inflation adjustment. Conservative bonds might yield 3-5%, while savings accounts yield less.' },
                                 { q: 'How does monthly contribution affect growth?', a: 'Regular contributions (Dollar Cost Averaging) significantly boost your total balance and smooth out market volatility.' },
                                 { q: 'Does this account for inflation?', a: 'No, this calculates nominal value. To estimate "real" purchasing power, subtract the inflation rate (e.g., 2-3%) from your expected return rate.' },
                                 { q: 'Is this the same as compound interest?', a: 'Yes, this tool applies compound interest logic to both your initial deposit and your recurring monthly additions.' },
                                 { q: 'Is this calculator free?', a: 'Yes, CalcBrew tools are 100% free and private.' }
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
                                 Investments carry risk. Past performance does not guarantee future results. This tool provides estimates only, not financial advice.
                             </p>
                         </div>
                     </section>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Related Finance Tools</h3>
                    <ul className="space-y-3">
                        <button onClick={() => onNavigate && onNavigate('calculator-compound-interest')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Compound Interest
                        </button>
                        <button onClick={() => onNavigate && onNavigate('calculator-simple-interest')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Simple Interest
                        </button>
                    </ul>
                 </div>
            </div>

         </div>
      </div>
    </div>
  );
};
export default InvestmentGrowthPage;