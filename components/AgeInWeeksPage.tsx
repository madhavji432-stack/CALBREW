import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, Calendar, RefreshCcw } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const AgeInWeeksPage: React.FC<PageProps> = ({ onNavigate }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(today);
  const [weeksAlive, setWeeksAlive] = useState<{ total: number, remainderDays: number } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    setWeeksAlive(null);

    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    if (start > end) {
      setError('The Start Date cannot be in the future relative to the End Date.');
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    
    setWeeksAlive({ total: weeks, remainderDays: days });

  }, [startDate, endDate]);

  const handleReset = () => {
    setStartDate('');
    setEndDate(today);
    setWeeksAlive(null);
    setError('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Age in Weeks Calculator - Weeks Since Birth</h1>
        <p>Calculate your age in weeks and days. Useful for pregnancy tracking, baby milestones, or project timelines. Free and instant.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Age in Weeks Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Find out exactly how many weeks have passed since a specific date. Ideal for tracking pregnancy progress, infant age, or counting weeks between two events.
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
                    Start Date (e.g. Birth)
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
                weeksAlive !== null ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-8 text-center min-h-[140px] flex flex-col items-center justify-center">
                  {weeksAlive !== null ? (
                    <div className="animate-in zoom-in-95 duration-300">
                      <span className="block text-xs font-bold text-primary-600 mb-2 uppercase tracking-wider">
                        Total duration
                      </span>
                      <span className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                        {weeksAlive.total.toLocaleString()}
                      </span>
                      <span className="block text-lg text-slate-500 mt-1 font-medium">weeks</span>
                      {weeksAlive.remainderDays > 0 && (
                        <span className="block text-sm text-slate-400 mt-2 font-medium">
                          + {weeksAlive.remainderDays} days
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Calendar className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium">Enter dates above to calculate</p>
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
                  <li><strong>Start Date:</strong> Input a date of birth or the start of a period (like pregnancy).</li>
                  <li><strong>End Date:</strong> Defaults to today, but can be set to a future date to predict week counts.</li>
                  <li><strong>Calculation:</strong> The tool calculates the total days between dates and divides by 7. Any remaining days are shown separately.</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculation Logic</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We first convert both dates to UTC timestamps to find the absolute difference in days.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-700 mb-4">
                Total Weeks = Floor(Total Days / 7) <br/>
                Remaining Days = Total Days % 7
              </div>
              <p className="text-slate-600 leading-relaxed">
                This method is precise and often used by medical professionals for tracking gestational age (weeks + days).
              </p>
            </section>

             <section className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Example: Baby Age</h3>
              <p className="text-slate-700 mb-2"><strong>Born:</strong> August 1, 2023. <strong>Today:</strong> October 15, 2023.</p>
              <p className="text-slate-700"><strong>Result:</strong> 10 Weeks + 5 Days</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Use Cases</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  'Pregnancy tracking (e.g., 32 weeks pregnant)',
                  'Newborn age tracking (weeks old)',
                  'Project sprints and business timelines',
                  'Academic term planning',
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
                  { q: 'Is this useful for pregnancy?', a: 'Yes! Doctors use weeks and days to track pregnancy. This tool follows that exact format.' },
                  { q: 'Does a week start on Sunday or Monday?', a: 'This calculator measures duration, so it counts any 7-day period as a week, regardless of the day names.' },
                  { q: 'Is the end date included?', a: 'The calculation measures the time span between the two dates.' },
                  { q: 'Can I calculate weeks between future dates?', a: 'Yes, just set both dates to the future to see the duration between them.' },
                  { q: 'Is this calculator free?', a: 'Yes, it is 100% free with no limits.' }
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
                  { name: 'Age in Months Calculator', id: 'calculator-age-months' },
                  { name: 'Date Difference Calculator', id: 'calculator-date-difference' },
                  { name: 'Age in Weeks Calculator', id: 'calculator-age-weeks', active: true },
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
                  <span><strong>Simple:</strong> Instant results.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Mobile:</strong> Works on any device.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeInWeeksPage;