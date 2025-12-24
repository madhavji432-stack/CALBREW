import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, Calendar, Clock, Play, Pause } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

interface DurationResult {
  breakdown: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  total: {
    days: number;
    weeks: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  inFuture: boolean;
}

const DateTimeCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('00:00');
  
  const [endDate, setEndDate] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('00:00');
  
  const [isLive, setIsLive] = useState(false);
  const [result, setResult] = useState<DurationResult | null>(null);

  // Initial load: Set today as default
  useEffect(() => {
    const today = new Date();
    const isoDate = today.toISOString().split('T')[0];
    setStartDate(isoDate);
    setEndDate(isoDate);
  }, []);

  // Live Timer Effect
  useEffect(() => {
    let interval: number;

    if (isLive) {
      const tick = () => {
        const now = new Date();
        const isoDate = now.toISOString().split('T')[0];
        // Format HH:MM for input compatibility
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0'); // For display purposes only
        
        setEndDate(isoDate);
        setEndTime(`${hours}:${minutes}`);
        
        // Trigger calculation immediately with seconds precision
        calculateDifference(startDate, startTime, isoDate, `${hours}:${minutes}:${seconds}`);
      };

      // Initial tick
      tick();
      // Interval
      interval = window.setInterval(tick, 1000);
    }

    return () => clearInterval(interval);
  }, [isLive, startDate, startTime]);

  // Standard Calculation Effect
  useEffect(() => {
    if (!isLive) {
      calculateDifference(startDate, startTime, endDate, endTime);
    }
  }, [startDate, startTime, endDate, endTime, isLive]);

  const calculateDifference = (sDate: string, sTime: string, eDate: string, eTime: string) => {
    
    if (!sDate || !eDate) {
      setResult(null);
      return;
    }

    // Append seconds if not present (default to 00 if manual, keep live seconds if passed)
    const fullStartTime = sTime.length === 5 ? `${sTime}:00` : sTime;
    const fullEndTime = eTime.length === 5 ? `${eTime}:00` : eTime;

    const start = new Date(`${sDate}T${fullStartTime}`);
    let end = new Date(`${eDate}T${fullEndTime}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const diffMs = end.getTime() - start.getTime();
    const inFuture = diffMs >= 0;
    const absDiffMs = Math.abs(diffMs);
    
    // --- Total Units Calculation ---
    const totalSeconds = Math.floor(absDiffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = (totalDays / 7).toFixed(1);

    // --- Detailed Breakdown Calculation (Calendar Logic) ---
    // We calculate "forward" from the earlier date to the later date
    const d1 = inFuture ? start : end;
    const d2 = inFuture ? end : start;

    let tempDate = new Date(d1);
    let years = 0;
    let months = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // 1. Add Years
    while (true) {
        const testDate = new Date(tempDate);
        testDate.setFullYear(tempDate.getFullYear() + 1);
        if (testDate.getTime() > d2.getTime()) break;
        tempDate = testDate;
        years++;
    }

    // 2. Add Months
    while (true) {
        const testDate = new Date(tempDate);
        testDate.setMonth(tempDate.getMonth() + 1);
        if (testDate.getTime() > d2.getTime()) break;
        tempDate = testDate;
        months++;
    }

    // 3. Add Days
    while (true) {
        const testDate = new Date(tempDate);
        testDate.setDate(tempDate.getDate() + 1);
        if (testDate.getTime() > d2.getTime()) break;
        tempDate = testDate;
        days++;
    }

    // 4. Add Hours
    while (true) {
        const testDate = new Date(tempDate);
        testDate.setHours(tempDate.getHours() + 1);
        if (testDate.getTime() > d2.getTime()) break;
        tempDate = testDate;
        hours++;
    }

    // 5. Add Minutes
    while (true) {
        const testDate = new Date(tempDate);
        testDate.setMinutes(tempDate.getMinutes() + 1);
        if (testDate.getTime() > d2.getTime()) break;
        tempDate = testDate;
        minutes++;
    }

    // 6. Add Seconds
    while (true) {
        const testDate = new Date(tempDate);
        testDate.setSeconds(tempDate.getSeconds() + 1);
        if (testDate.getTime() > d2.getTime()) break;
        tempDate = testDate;
        seconds++;
    }

    setResult({
        breakdown: { years, months, days, hours, minutes, seconds },
        total: {
            days: totalDays,
            weeks: totalWeeks,
            hours: totalHours.toLocaleString(),
            minutes: totalMinutes.toLocaleString(),
            seconds: totalSeconds.toLocaleString()
        },
        inFuture
    });
  };

  const handleReset = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setStartTime('00:00');
    setEndDate(today);
    setEndTime('00:00');
    setIsLive(false);
    setResult(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Date and Time Difference Calculator (Duration)</h1>
        <p>Calculate days, hours, minutes and seconds between two dates. Features live time tracking, detailed breakdowns, and total duration counts.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                <Clock className="w-6 h-6" />
             </div>
             <span className="text-sm font-bold text-primary-600 tracking-wide uppercase">All-in-One Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Advanced Date & Time Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            The ultimate tool to calculate the exact duration between two dates and times. Get results in Years, Months, Days, Hours, Minutes, and Seconds.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Calculator Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              
              {/* Start Section */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div> Start
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Time</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900"
                        />
                    </div>
                </div>
              </div>

              {/* End Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`}></div> End
                    </h3>
                    
                    <button
                        onClick={() => setIsLive(!isLive)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                            isLive 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {isLive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {isLive ? 'Live Mode On' : 'Enable Live Mode'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Date</label>
                        <input
                            type="date"
                            value={endDate}
                            disabled={isLive}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 ${isLive ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'border-slate-300'}`}
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Time</label>
                        <input
                            type="time"
                            value={endTime}
                            disabled={isLive}
                            onChange={(e) => setEndTime(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 ${isLive ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'border-slate-300'}`}
                        />
                    </div>
                </div>
                {isLive && <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Updating every second to current time</p>}
              </div>

              {/* Result Area */}
              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                result ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-6 md:p-8 min-h-[220px] flex flex-col justify-center">
                  {result ? (
                    <div className="animate-in fade-in duration-300">
                        {/* Primary Result Breakdown */}
                        <div className="text-center mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-white border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
                                Detailed Duration
                            </span>
                            
                            {/* Flex Container for Result Units - Always shows Years */}
                            <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-4 text-slate-900 font-sans">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl md:text-5xl font-extrabold tracking-tight tabular-nums">{result.breakdown.years}</span>
                                    <span className="text-sm md:text-base font-semibold text-slate-500">years</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl md:text-5xl font-extrabold tracking-tight tabular-nums">{result.breakdown.months}</span>
                                    <span className="text-sm md:text-base font-semibold text-slate-500">months</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl md:text-5xl font-extrabold tracking-tight tabular-nums">{result.breakdown.days}</span>
                                    <span className="text-sm md:text-base font-semibold text-slate-500">days</span>
                                </div>
                                
                                <div className="w-full sm:w-auto flex flex-wrap justify-center gap-x-4 gap-y-2 sm:border-l sm:border-slate-300 sm:pl-4 sm:ml-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl md:text-4xl font-extrabold tracking-tight tabular-nums">{result.breakdown.hours}</span>
                                        <span className="text-sm md:text-base font-semibold text-slate-500">hrs</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl md:text-4xl font-extrabold tracking-tight tabular-nums">{result.breakdown.minutes}</span>
                                        <span className="text-sm md:text-base font-semibold text-slate-500">min</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl md:text-4xl font-extrabold tracking-tight tabular-nums text-indigo-600 min-w-[1.5ch] text-right">{result.breakdown.seconds}</span>
                                        <span className="text-sm md:text-base font-semibold text-indigo-500">s</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-500 text-sm mt-5 font-medium">
                                {result.inFuture ? 'from start date to end date' : 'start date is ahead of end date'}
                            </p>
                        </div>

                        {/* Total Summary Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-indigo-200/50">
                            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Total Days</span>
                                <span className="block text-lg font-bold text-slate-800 tabular-nums">{result.total.days.toLocaleString()}</span>
                            </div>
                             <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Total Weeks</span>
                                <span className="block text-lg font-bold text-slate-800 tabular-nums">{result.total.weeks}</span>
                            </div>
                             <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Total Hours</span>
                                <span className="block text-lg font-bold text-slate-800 tabular-nums">{result.total.hours}</span>
                            </div>
                             <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Total Minutes</span>
                                <span className="block text-lg font-bold text-slate-800 tabular-nums">{result.total.minutes}</span>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center text-center">
                      <Calendar className="w-10 h-10 mb-3 opacity-50" />
                      <p className="font-medium">Enter a start and end date to calculate duration.</p>
                    </div>
                  )}
                </div>
              </div>

               {/* Reset Button */}
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

            {/* Content Sections */}
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What is this calculator?</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  This is an advanced all-in-one date and time utility. Unlike simple counters that just show "days left", this tool calculates the complete chronological gap between any two moments in time.
                </p>
                <p>
                  It breaks down the duration into two formats:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Calendar View:</strong> Shows the result as years, months, days, hours, minutes, and seconds (e.g., "1 Year, 2 Months, 5 Days").</li>
                  <li><strong>Total Units:</strong> Converts the entire duration into total days, total hours, or total seconds.</li>
                </ul>
              </div>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Use Cases</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  'Calculate exact age in years/months/seconds',
                  'Track time elapsed since a past event',
                  'Countdown to a future deadline or event',
                  'Calculate total working hours for payroll',
                  'Legal duration calculations (e.g. visa stay)',
                  'Project sprint planning (weeks + days)',
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
                  { q: 'Does this calculator handle leap years?', a: 'Yes. The calculation engine uses standard Gregorian calendar logic, which automatically accounts for leap years (29 days in February) and varying month lengths (28, 30, or 31 days).' },
                  { q: 'How does the Live Mode work?', a: 'When Live Mode is enabled, the "End Date" is locked to your device\'s current clock. The calculator updates every second, making it perfect for tracking age or countdowns in real-time.' },
                  { q: 'Can I calculate just the time difference?', a: 'Yes. If you keep the dates the same and only change the Start and End times, the tool will function as a time duration calculator.' },
                  { q: 'Is the end date included in the count?', a: 'This tool calculates the "duration" or gap between points. For example, Monday to Tuesday is 1 day. If you need inclusive counting (e.g. counting both Monday and Tuesday as work days), add 1 day to the total.' },
                  { q: 'Is this tool free?', a: 'Yes, this calculator is 100% free and runs entirely in your browser. No data is sent to any server.' }
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
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-900 mb-4">Related Time Tools</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Age in Days Calculator', id: 'calculator-age-days' },
                  { name: 'Age in Weeks Calculator', id: 'calculator-age-weeks' },
                  { name: 'Age in Months Calculator', id: 'calculator-age-months' },
                  { name: 'Date Difference Calculator', id: 'calculator-date-difference' },
                  { name: 'Date & Time Calculator', id: 'calculator-date-time', active: true },
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
                  <span><strong>Live:</strong> Real-time updates.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Precise:</strong> Down to the second.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeCalculatorPage;