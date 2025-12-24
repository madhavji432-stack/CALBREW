import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, Calendar, RefreshCcw } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const DateDifferencePage: React.FC<PageProps> = ({ onNavigate }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [diff, setDiff] = useState<{ years: number, months: number, days: number, totalDays: number } | null>(null);
  
  // Validation state object
  const [errors, setErrors] = useState<{ start?: string; end?: string }>({});

  useEffect(() => {
    // Reset results and errors on every change before validating
    setDiff(null);
    setErrors({});

    // 1. Check if both fields have values
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const newErrors: { start?: string; end?: string } = {};
    let hasError = false;

    // 2. Validate Date Validity
    if (isNaN(start.getTime())) {
      newErrors.start = 'Please enter a valid start date.';
      hasError = true;
    }
    if (isNaN(end.getTime())) {
      newErrors.end = 'Please enter a valid end date.';
      hasError = true;
    }

    // 3. Validate Chronological Order
    if (!hasError && start > end) {
      newErrors.start = 'Start date cannot be after the end date.';
      hasError = true;
    }

    // Update error state
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // 4. Perform Calculation (Only if no errors)
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Breakdown (Y/M/D)
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonthDate = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonthDate.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setDiff({ years, months, days, totalDays });

  }, [startDate, endDate]);

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setDiff(null);
    setErrors({});
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 sm:pb-20">
      <div className="hidden">
        <h1>Date Difference Calculator - Duration Between Two Dates</h1>
        <p>Calculate the exact duration between two dates in years, months, and days. Find the total number of days between any two calendar dates.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Date Difference Calculator
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Find the exact time duration between any two dates. See the result broken down into years, months, and days, or view the total count of days.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="start" className="block text-sm font-bold text-slate-700 mb-2">
                    Start Date
                  </label>
                  <input
                    id="start"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-shadow text-slate-900 ${
                      errors.start 
                        ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                        : 'border-slate-300 focus:ring-primary-600'
                    }`}
                  />
                  {/* Inline Error Message */}
                  {errors.start && (
                    <div className="mt-2 flex items-start gap-1.5 text-sm text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{errors.start}</span>
                    </div>
                  )}
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
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-shadow text-slate-900 ${
                      errors.end
                        ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                        : 'border-slate-300 focus:ring-primary-600'
                    }`}
                  />
                  {/* Inline Error Message */}
                  {errors.end && (
                    <div className="mt-2 flex items-start gap-1.5 text-sm text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{errors.end}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                diff !== null ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-6 md:p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                  {diff !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-primary-600 mb-4 uppercase tracking-wider">
                        Time Duration
                      </span>
                      
                      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
                         {diff.years > 0 && (
                            <div className="flex flex-col">
                                <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{diff.years}</span>
                                <span className="text-sm text-slate-500 font-medium">Years</span>
                            </div>
                         )}
                         {(diff.months > 0 || diff.years > 0) && (
                            <div className="flex flex-col">
                                <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{diff.months}</span>
                                <span className="text-sm text-slate-500 font-medium">Months</span>
                            </div>
                         )}
                         <div className="flex flex-col">
                            <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{diff.days}</span>
                            <span className="text-sm text-slate-500 font-medium">Days</span>
                         </div>
                      </div>

                      <div className="pt-6 border-t border-primary-100 w-full max-w-xs mx-auto">
                        <p className="text-slate-600 text-sm mb-1">Total count in days:</p>
                        <p className="text-lg md:text-xl font-bold text-slate-900">{diff.totalDays.toLocaleString()} days</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Calendar className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium text-sm md:text-base">
                        {Object.keys(errors).length > 0 ? 'Fix errors to calculate' : 'Enter two dates to calculate difference'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

               {(startDate || endDate) && (
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

            <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">How It Works</h2>
              <div className="space-y-4 text-slate-600 text-sm md:text-base">
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Select Start Date:</strong> The beginning of your time period.</li>
                  <li><strong>Select End Date:</strong> The conclusion of your time period. Must be after the start date.</li>
                  <li><strong>See Duration:</strong> We calculate the full years, months, and remaining days between the two. We also provide a total day count.</li>
                </ol>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-900 mb-4">Related Time Tools</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Age in Days Calculator', id: 'calculator-age-days' },
                  { name: 'Age in Weeks Calculator', id: 'calculator-age-weeks' },
                  { name: 'Age in Months Calculator', id: 'calculator-age-months' },
                  { name: 'Date Difference Calculator', id: 'calculator-date-difference', active: true },
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

export default DateDifferencePage;