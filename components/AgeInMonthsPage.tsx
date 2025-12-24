import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, Calendar, RefreshCcw } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const AgeInMonthsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(today);
  const [monthsAlive, setMonthsAlive] = useState<{ total: number, remainderDays: number } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    setMonthsAlive(null);

    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    if (start > end) {
      setError('Start date cannot be after end date.');
      return;
    }

    // Calculate months
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += end.getMonth();

    // Adjust if end day is before start day in the month
    if (end.getDate() < start.getDate()) {
      months--;
    }

    // Calculate remaining days
    // Create a date object that represents the start date + calculated months
    const dateWithMonthsAdded = new Date(start);
    dateWithMonthsAdded.setMonth(start.getMonth() + months);

    const diffTime = Math.abs(end.getTime() - dateWithMonthsAdded.getTime());
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setMonthsAlive({ total: months, remainderDays: remainingDays });

  }, [startDate, endDate]);

  const handleReset = () => {
    setStartDate('');
    setEndDate(today);
    setMonthsAlive(null);
    setError('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Age in Months Calculator - Months Old Calculator</h1>
        <p>Calculate exact age in months and days. Perfect for babies, infants, and monthly anniversaries.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Age in Months Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Determine the precise age in months and days. Essential for tracking infant development milestones, billing cycles, or monthly project durations.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="start" className="block text-sm font-bold text-slate-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    id="start"
                    type="date"
                    value={startDate}
                    max={today}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900"
                  />
                </div>
                <div>
                  <label htmlFor="end" className="block text-sm font-bold text-slate-700 mb-2">
                    End Date
                  </label>
                  <input
                    id="end"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                monthsAlive !== null ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-8 text-center min-h-[140px] flex flex-col items-center justify-center">
                  {monthsAlive !== null ? (
                    <div className="animate-in zoom-in-95 duration-300">
                      <span className="block text-xs font-bold text-primary-600 mb-2 uppercase tracking-wider">
                        Total duration
                      </span>
                      <span className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                        {monthsAlive.total.toLocaleString()}
                      </span>
                      <span className="block text-lg text-slate-500 mt-1 font-medium">months</span>
                       {monthsAlive.remainderDays > 0 && (
                        <span className="block text-sm text-slate-400 mt-2 font-medium">
                          + {monthsAlive.remainderDays} days
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Calendar className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium">Enter dates to see months</p>
                    </div>
                  )}
                </div>
              </div>

               {(startDate || endDate !== today) && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2 px-4 rounded-lg hover:bg-slate-100"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              )}
            </div>

            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
              <div className="space-y-4 text-slate-600">
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Start Date:</strong> Input the starting date (e.g., date of birth).</li>
                  <li><strong>End Date:</strong> Defaults to the current date for "age" calculations.</li>
                  <li><strong>Result:</strong> The calculator counts complete months that have passed, and any leftover days are displayed separately.</li>
                </ol>
              </div>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculation Logic</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Calculating months is more complex than days because month lengths vary (28-31 days). Our algorithm calculates the difference in years multiplied by 12, adds the difference in months, and then adjusts if the "day of the month" has not yet been reached in the end month.
              </p>
            </section>

             <section className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Example: Infant Age</h3>
              <p className="text-slate-700 mb-2"><strong>Born:</strong> January 15, 2023. <strong>Today:</strong> March 20, 2023.</p>
              <p className="text-slate-700"><strong>Result:</strong> 2 Months + 5 Days</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Use Cases</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  'Tracking baby age (e.g., 18 months)',
                  'Relationship anniversaries',
                  'Short-term financial loans',
                  'Visa and travel stay calculations',
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
                  { q: 'Why calculate age in months?', a: 'Developmental milestones for children under 2 years old are typically measured in months.' },
                  { q: 'Does it handle leap years?', a: 'Yes, because we calculate based on calendar dates, leap years are naturally accounted for in the day count.' },
                  { q: 'Is 4 weeks considered a month?', a: 'Not exactly. A calendar month ranges from 28 to 31 days. This tool uses calendar months for accuracy.' },
                  { q: 'Can I calculate months between future dates?', a: 'Yes, simply enter any two dates to find the gap in months between them.' },
                  { q: 'Is this calculator free?', a: 'Yes, CalcBrew is completely free to use.' }
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
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Related Time Tools</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Age in Days Calculator', id: 'calculator-age-days' },
                  { name: 'Age in Weeks Calculator', id: 'calculator-age-weeks' },
                  { name: 'Date Difference Calculator', id: 'calculator-date-difference' },
                  { name: 'Age in Months Calculator', id: 'calculator-age-months', active: true },
                ].map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => !link.active && onNavigate ? onNavigate(link.id) : null}
                      className={`flex items-center text-left w-full transition-colors group ${
                        link.active 
                          ? 'text-primary-600 font-semibold cursor-default' 
                          : 'text-slate-600 hover:text-primary-600 cursor-pointer'
                      }`}
                    >
                      <ArrowRight className={`w-4 h-4 mr-2 ${link.active ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-600'}`} />
                      <span className="text-sm">{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
             <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-4">Why use CalcBrew?</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Precise:</strong> Exact month counts.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Fast:</strong> Live updates.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeInMonthsPage;