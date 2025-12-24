
import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCcw, DollarSign, Users, Percent, HelpCircle, ShieldCheck, Check } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const QuickTipPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [bill, setBill] = useState<string>('');
  const [tipPercent, setTipPercent] = useState<number | ''>(20); // Default 20%
  const [people, setPeople] = useState<number>(1);
  
  const [results, setResults] = useState<{ tipAmount: number, totalBill: number, perPerson: number } | null>(null);

  useEffect(() => {
    const billAmount = parseFloat(bill);
    const tip = typeof tipPercent === 'number' ? tipPercent : parseFloat(tipPercent);
    const splitCount = people < 1 ? 1 : people;

    if (!isNaN(billAmount) && !isNaN(tip)) {
      const tipValue = billAmount * (tip / 100);
      const totalValue = billAmount + tipValue;
      const personValue = totalValue / splitCount;

      setResults({
        tipAmount: tipValue,
        totalBill: totalValue,
        perPerson: personValue
      });
    } else {
      setResults(null);
    }
  }, [bill, tipPercent, people]);

  const handleReset = () => {
    setBill('');
    setTipPercent(20);
    setPeople(1);
    setResults(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 sm:pb-20">
      <div className="hidden">
        <h1>Tip Calculator & Bill Splitter</h1>
        <p>Calculate gratuity and split bills instantly. The best free tip calculator for dining, taxis, and services.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Quick Tip Calculator
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Instantly calculate the correct tip and split the total bill among friends. Avoid the math headache after a meal with this simple, free tool.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            {/* Calculator Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8">
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Bill Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <input 
                                type="number" 
                                value={bill} 
                                onChange={(e) => setBill(e.target.value)} 
                                placeholder="0.00" 
                                className="w-full pl-9 pr-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-600 outline-none text-xl font-medium text-slate-900"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <label className="block text-sm font-bold text-slate-700">Tip Percentage</label>
                            <div className="group relative">
                                <HelpCircle className="w-4 h-4 text-slate-400 cursor-help transition-colors hover:text-slate-600" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-800 text-white text-xs leading-relaxed rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center font-normal">
                                    Choose a standard rate or enter a custom percentage based on service quality.
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                            {[15, 18, 20, 25].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setTipPercent(p)}
                                    className={`py-2 rounded-lg text-sm font-bold transition-all border ${
                                        tipPercent === p
                                        ? 'bg-primary-600 border-primary-600 text-white'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {p}%
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={tipPercent} 
                                onChange={(e) => setTipPercent(e.target.value === '' ? '' : parseFloat(e.target.value))} 
                                placeholder="Custom" 
                                className="w-full pl-4 pr-9 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 outline-none text-slate-900"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <label className="block text-sm font-bold text-slate-700">Split Between</label>
                            <div className="group relative">
                                <HelpCircle className="w-4 h-4 text-slate-400 cursor-help transition-colors hover:text-slate-600" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-800 text-white text-xs leading-relaxed rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center font-normal">
                                    Enter the number of people sharing the bill to calculate how much each person owes.
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center">
                            <button 
                                onClick={() => setPeople(Math.max(1, people - 1))}
                                className="absolute left-1 p-2 hover:bg-slate-100 rounded-lg text-slate-500"
                            >
                                -
                            </button>
                            <div className="w-full py-3 text-center border border-slate-300 rounded-lg font-bold text-lg text-slate-900 bg-slate-50">
                                {people} {people === 1 ? 'Person' : 'People'}
                            </div>
                            <button 
                                onClick={() => setPeople(people + 1)}
                                className="absolute right-1 p-2 hover:bg-slate-100 rounded-lg text-slate-500"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl shadow-slate-900/10">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                            <div>
                                <span className="block text-sm text-slate-400 font-medium">Tip Amount</span>
                                <span className="text-xs text-slate-500">Total</span>
                            </div>
                            <span className="text-2xl font-bold text-primary-400">
                                ${results ? results.tipAmount.toFixed(2) : '0.00'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                            <div>
                                <span className="block text-sm text-slate-400 font-medium">Total Bill</span>
                                <span className="text-xs text-slate-500">Tip included</span>
                            </div>
                            <span className="text-2xl font-bold">
                                ${results ? results.totalBill.toFixed(2) : '0.00'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 bg-slate-800/50 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="block text-sm font-bold text-slate-200">Per Person</span>
                                <span className="text-xs text-slate-500">Bill ÷ {people}</span>
                            </div>
                            <span className="text-4xl font-extrabold text-green-400">
                                ${results ? results.perPerson.toFixed(2) : '0.00'}
                            </span>
                        </div>
                    </div>
                </div>
              </div>

               {/* Reset Button */}
               {(bill || tipPercent !== 20 || people !== 1) && (
                <div className="flex justify-center">
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

            {/* Content Sections */}
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use the Tip Calculator</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Calculating gratuity doesn't have to be complicated. Here is a simple breakdown of how this tool works:
                    </p>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">1</span>
                            <span className="text-slate-700"><strong>Enter Bill:</strong> Type in the pre-tax total from your check.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">2</span>
                            <span className="text-slate-700"><strong>Select Percentage:</strong> Choose a standard rate (15-25%) or enter a custom amount.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">3</span>
                            <span className="text-slate-700"><strong>Split:</strong> If dining with a group, adjust the number of people to see what each person owes.</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Tipping Etiquette Guide</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-lg border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-2">Sit-down Restaurants</h3>
                            <p className="text-sm text-slate-600">Standard is <strong>15% - 20%</strong>. For exceptional service, 25% is appreciated.</p>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-2">Food Delivery</h3>
                            <p className="text-sm text-slate-600">Usually <strong>10% - 15%</strong>, or a minimum of $5, whichever is higher.</p>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-2">Bars & Drinks</h3>
                            <p className="text-sm text-slate-600">Typically <strong>$1 - $2 per drink</strong> or 20% of the total tab.</p>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-2">Taxis & Rideshare</h3>
                            <p className="text-sm text-slate-600">Generally <strong>15% - 20%</strong> of the fare for a safe, clean ride.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Should I calculate tip on the total with or without tax?', a: 'Etiquette suggests calculating tip on the pre-tax subtotal. However, many people tip on the total for simplicity.' },
                            { q: 'What is a "good" tip?', a: 'In the US, 15% is considered standard service, 18% is good, and 20%+ is excellent. Anything below 15% usually indicates poor service.' },
                            { q: 'How do I split the bill evenly?', a: 'Simply enter the total amount (including tip) and increase the "Split Between" counter. Our calculator does the division for you.' },
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
                        <h3 className="font-bold text-slate-900 mb-2">Privacy Note</h3>
                        <p className="text-sm text-slate-600">
                            Calculations are performed instantly on your device. We do not store or transmit your financial data.
                        </p>
                    </div>
                </section>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
                <h3 className="font-bold text-slate-900 mb-4">Related Finance Tools</h3>
                <ul className="space-y-3">
                    <button onClick={() => onNavigate && onNavigate('calculator-loan-emi')} className="flex items-center w-full text-left text-slate-600 hover:text-primary-600 group">
                        <ArrowRight className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary-600" /> <span className="text-sm font-medium">Loan Calculator</span>
                    </button>
                    <button onClick={() => onNavigate && onNavigate('calculator-simple-interest')} className="flex items-center w-full text-left text-slate-600 hover:text-primary-600 group">
                        <ArrowRight className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary-600" /> <span className="text-sm font-medium">Simple Interest</span>
                    </button>
                    <button onClick={() => onNavigate && onNavigate('calculator-compound-interest')} className="flex items-center w-full text-left text-slate-600 hover:text-primary-600 group">
                        <ArrowRight className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary-600" /> <span className="text-sm font-medium">Compound Interest</span>
                    </button>
                    <button onClick={() => onNavigate && onNavigate('calculator-percentage-increase')} className="flex items-center w-full text-left text-slate-600 hover:text-primary-600 group">
                        <ArrowRight className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary-600" /> <span className="text-sm font-medium">Percentage Calculator</span>
                    </button>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTipPage;
