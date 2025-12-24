import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, DollarSign, PieChart, Calendar } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const LoanCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  
  const [result, setResult] = useState<{ emi: number, totalInterest: number, totalPayment: number } | null>(null);

  useEffect(() => {
    setResult(null);

    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate);
    const t = parseFloat(tenure);

    // Basic Validation
    if (isNaN(P) || P <= 0) return;
    if (isNaN(r) || r < 0) return;
    if (isNaN(t) || t <= 0) return;

    // Logic
    // P = Principal
    // R = Monthly interest rate = (Rate / 12) / 100
    // N = Total months
    
    let n = t;
    if (tenureType === 'years') {
        n = t * 12;
    }

    let emi = 0;
    let totalInt = 0;
    let totalPay = 0;

    if (r === 0) {
        // Simple division if 0 interest
        emi = P / n;
        totalInt = 0;
        totalPay = P;
    } else {
        const R = r / 12 / 100;
        // Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
        const top = Math.pow(1 + R, n);
        emi = (P * R * top) / (top - 1);
        
        totalPay = emi * n;
        totalInt = totalPay - P;
    }

    setResult({
        emi: emi,
        totalInterest: totalInt,
        totalPayment: totalPay
    });

  }, [loanAmount, interestRate, tenure, tenureType]);

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setTenure('');
    setResult(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Loan Calculator - Calculate EMI & Total Interest</h1>
        <p>Estimate your monthly loan payments (EMI) instantly. Perfect for home loans, car loans, and personal loans. Simple, free, and accurate.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Loan Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Plan your finances with precision. Calculate your monthly EMI and total interest payable for home loans, car loans, or personal loans.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2">
                   <label className="block text-sm font-bold text-slate-700 mb-2">Loan Amount</label>
                   <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                     <input
                       type="number"
                       value={loanAmount}
                       onChange={(e) => setLoanAmount(e.target.value)}
                       placeholder="100000"
                       className="w-full pl-9 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                     />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Interest Rate (% per year)</label>
                   <div className="relative">
                     <input
                       type="number"
                       value={interestRate}
                       onChange={(e) => setInterestRate(e.target.value)}
                       placeholder="5.5"
                       className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                     />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Loan Tenure</label>
                   <div className="flex gap-0">
                     <input
                       type="number"
                       value={tenure}
                       onChange={(e) => setTenure(e.target.value)}
                       placeholder="30"
                       className="w-full px-4 py-3 rounded-l-lg border border-r-0 border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                     />
                     <div className="bg-slate-100 border border-slate-300 rounded-r-lg flex">
                        <button 
                            onClick={() => setTenureType('years')}
                            className={`px-3 text-sm font-semibold transition-colors ${tenureType === 'years' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Yr
                        </button>
                        <button 
                            onClick={() => setTenureType('months')}
                            className={`px-3 text-sm font-semibold rounded-r-lg transition-colors ${tenureType === 'months' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Mo
                        </button>
                     </div>
                   </div>
                </div>
              </div>

              {/* Result Box */}
              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                result !== null ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-8 min-h-[180px] flex flex-col items-center justify-center">
                  {result !== null ? (
                    <div className="w-full animate-in zoom-in-95 duration-300">
                      
                      <div className="text-center mb-8">
                        <span className="block text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wider">
                            Monthly Payment (EMI)
                        </span>
                        <span className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                            {result.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            <span className="text-lg font-medium text-slate-500 ml-1">.{(result.emi % 1).toFixed(2).substring(2)}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-indigo-200/50 pt-6">
                         <div className="text-center">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Interest</p>
                            <p className="text-xl font-bold text-slate-700">
                                {result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </p>
                         </div>
                         <div className="text-center border-l border-indigo-200/50">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Payment</p>
                            <p className="text-xl font-bold text-primary-700">
                                {result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </p>
                         </div>
                      </div>

                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center text-center">
                      <PieChart className="w-10 h-10 mb-3 opacity-50" />
                      <p className="font-medium">Enter loan details to estimate payments</p>
                    </div>
                  )}
                </div>
              </div>

               {/* Reset Button */}
               {(result !== null) && (
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

            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                    This calculator uses the standard Equated Monthly Installment (EMI) formula used by most banks worldwide.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Loan Amount:</strong> The principal amount you wish to borrow.</li>
                  <li><strong>Interest Rate:</strong> The annual interest rate offered by the lender.</li>
                  <li><strong>Tenure:</strong> The time period you have to repay the loan (e.g., 30 years for a mortgage).</li>
                </ol>
                <p className="mt-2 text-sm text-slate-500">
                    The calculator divides the interest and principal components so you pay a fixed amount every month.
                </p>
              </div>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Example Calculation</h2>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">Personal Loan</h3>
                <div className="space-y-2 text-slate-700">
                    <p><strong>Loan Amount:</strong> $10,000</p>
                    <p><strong>Interest Rate:</strong> 8% per year</p>
                    <p><strong>Tenure:</strong> 5 Years</p>
                    <div className="my-3 border-t border-slate-200"></div>
                    <p className="flex justify-between font-medium">
                        <span>Monthly EMI:</span>
                        <span className="text-primary-700">$202.76</span>
                    </p>
                    <p className="flex justify-between text-sm text-slate-500">
                        <span>Total Interest:</span>
                        <span>$2,165.84</span>
                    </p>
                    <p className="flex justify-between text-sm text-slate-500">
                        <span>Total Payable:</span>
                        <span>$12,165.84</span>
                    </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Use Cases</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  'Mortgage / Home Loan planning',
                  'Auto Loan monthly estimates',
                  'Personal Loan affordability check',
                  'Comparing different interest rates',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'How is EMI calculated?', a: 'EMI is calculated using a formula that spreads the principal and interest over the loan tenure so that you pay a constant amount monthly.' },
                  { q: 'Does this include taxes or fees?', a: 'No. This calculator estimates the principal and interest repayment only. Property taxes, insurance, and processing fees are extra.' },
                  { q: 'Can I use this for car loans?', a: 'Yes. The math is identical for car loans, personal loans, and mortgages.' },
                  { q: 'Why does the total payment increase with tenure?', a: 'Longer tenures lower your monthly payment but increase the total interest you pay over the life of the loan.' },
                  { q: 'Is this calculator free?', a: 'Yes, fully free and works anonymously.' }
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
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Related Calculators</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Percentage Increase Calculator', id: 'calculator-percentage-increase' },
                  { name: 'Reverse Percentage Calculator', id: 'calculator-reverse-percentage' },
                  { name: 'Average Calculator', id: '#' },
                  { name: 'Simple Interest Calculator', id: '#' },
                  { name: 'Compound Interest Calculator', id: '#' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate && link.id.startsWith('calculator') ? onNavigate(link.id) : null}
                      className={`flex items-center text-left w-full transition-colors group ${
                        onNavigate && link.id.startsWith('calculator') 
                          ? 'text-slate-600 hover:text-primary-600 cursor-pointer' 
                          : 'text-slate-400 cursor-default hover:text-slate-600'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary-600" />
                      <span className="text-sm">{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
               <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <h4 className="font-bold text-amber-900">Disclaimer</h4>
               </div>
               <p className="text-sm text-amber-800 leading-relaxed">
                  This tool estimates payments for educational purposes. Actual loan terms may vary by lender, credit score, and additional fees.
               </p>
            </div>

             <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-4">Why use CalcBrew?</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Secure:</strong> No data stored.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Global:</strong> Works with any currency.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanCalculatorPage;