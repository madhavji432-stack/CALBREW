import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, Calendar, RefreshCcw } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const AgeInDaysPage: React.FC<PageProps> = ({ onNavigate }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(today);
  const [daysAlive, setDaysAlive] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    setDaysAlive(null);
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;
    if (start > end) {
      setError('The Date of Birth cannot be in the future relative to the calculation date.');
      return;
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    setDaysAlive(diffDays);
  }, [startDate, endDate]);

  const handleReset = () => {
    setStartDate('');
    setEndDate(today);
    setDaysAlive(null);
    setError('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 sm:pb-20">
      <div className="hidden">
        <h1>Age in Days Calculator - How Many Days Have You Been Alive?</h1>
        <p>Calculate exactly how many days old you are instantly. Free tool to find out your age in days for fun, health tracking, or milestones.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Age in Days Calculator
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Ever wondered exactly how many days you've been on Earth? Use this simple, free tool to calculate your age in days instantly. Perfect for tracking milestones or just for fun.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8">
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
                    Calculate To (Date)
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
                daysAlive !== null ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'
              }`}>
                {/* Stabilized height to prevent jumping */}
                <div className="p-6 md:p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                  {daysAlive !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-primary-600 mb-2 uppercase tracking-wider">
                        You have been alive for
                      </span>
                      {/* Responsive text sizing for large numbers */}
                      <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight break-all">
                        {daysAlive.toLocaleString()}
                      </span>
                      <span className="block text-lg text-slate-500 mt-1 font-medium">days</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Calendar className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium text-sm md:text-base">Enter your date of birth above</p>
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
                    Reset Date
                  </button>
                </div>
              )}
            </div>

            <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">How It Works</h2>
              <div className="space-y-4 text-slate-600 text-sm md:text-base">
                <p>Calculating your age in days is simple with our tool:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Select your Date of Birth:</strong> Enter the day, month, and year you were born.</li>
                  <li><strong>Check the End Date:</strong> By default, it uses today's date, but you can change this to see how many days old you will be on a future date.</li>
                  <li><strong>View Result:</strong> The calculator instantly accounts for leap years and months of different lengths to give you the exact count.</li>
                </ol>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-900 mb-4">Related Time Tools</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Age in Weeks Calculator', id: 'calculator-age-weeks' },
                  { name: 'Age in Months Calculator', id: 'calculator-age-months' },
                  { name: 'Date Difference Calculator', id: 'calculator-date-difference' },
                  { name: 'Age in Days Calculator', id: 'calculator-age-days', active: true },
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeInDaysPage;