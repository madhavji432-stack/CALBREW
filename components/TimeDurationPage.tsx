import React, { useState } from 'react';
import { Clock, ArrowRight, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

interface PageProps { onNavigate?: (view: string) => void; }

const TimeDurationPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [diff, setDiff] = useState('');

  const calc = () => {
      if(!start || !end) return;
      const [h1, m1] = start.split(':').map(Number);
      const [h2, m2] = end.split(':').map(Number);
      let mins = (h2 * 60 + m2) - (h1 * 60 + m1);
      
      // Handle overnight shifts (e.g., 10 PM to 2 AM)
      if (mins < 0) mins += 24 * 60;
      
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      setDiff(`${h} Hours, ${m} Minutes`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Time Duration Calculator</h1>
        <p>Calculate hours and minutes between two times. Handles overnight durations. Perfect for work shifts, flight times, and payroll.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Time Duration Calculator</h1>
          <p className="text-slate-600">Easily calculate the hours and minutes between a start time and an end time.</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
         <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8 space-y-12">
                
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="font-bold text-sm text-slate-700">Start Time</label><input type="time" className="w-full p-3 border rounded-lg mt-1" value={start} onChange={e => setStart(e.target.value)} /></div>
                        <div><label className="font-bold text-sm text-slate-700">End Time</label><input type="time" className="w-full p-3 border rounded-lg mt-1" value={end} onChange={e => setEnd(e.target.value)} /></div>
                    </div>
                    <button onClick={calc} className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition">Calculate Duration</button>
                    {diff && <div className="text-center text-3xl font-bold text-slate-900 pt-4 border-t border-slate-100 mt-4">{diff}</div>}
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is the Time Duration Calculator?</h2>
                        <p className="text-slate-600 leading-relaxed">
                            This tool helps you find the exact time elapsed between two specific clock times. Unlike standard subtraction, it smartly handles time differences that cross over midnight (e.g., starting at 10 PM and ending at 6 AM). It is widely used for calculating work hours, sleep duration, and travel time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Use This Tool?</h2>
                         <ul className="space-y-3">
                            <li className="flex gap-3">
                                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                <span className="text-slate-700"><strong>Timesheets:</strong> Accurately log hours for payroll.</span>
                            </li>
                            <li className="flex gap-3">
                                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                <span className="text-slate-700"><strong>Sleep Tracking:</strong> Calculate exactly how long you slept.</span>
                            </li>
                             <li className="flex gap-3">
                                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                <span className="text-slate-700"><strong>Overnight Support:</strong> Automatically detects next-day end times.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Example: Overnight Shift</h3>
                        <p className="text-slate-600 mb-4">
                            You start work at <strong>22:00 (10 PM)</strong> and finish at <strong>06:30 (6:30 AM)</strong> the next day.
                        </p>
                        <p className="text-slate-600">
                           Logic: (24:00 - 22:00) + 06:30 = 2 hours + 6.5 hours = <strong>8 Hours, 30 Minutes</strong>.
                        </p>
                    </section>

                    <section>
                         <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                         <div className="space-y-4">
                             {[
                                 { q: 'Does this handle AM/PM?', a: 'Yes, if your browser settings use 12-hour format, the input will adapt. The calculation runs on a 24-hour cycle internally.' },
                                 { q: 'What if the end time is earlier than the start time?', a: 'The calculator assumes the end time belongs to the following day (overnight) and calculates accordingly.' },
                                 { q: 'Can I calculate duration over multiple days?', a: 'No, this tool works for durations under 24 hours. For multi-day calculations, use the Date & Time Calculator.' },
                                 { q: 'Is this useful for flight times?', a: 'Yes, it works perfectly for determining flight duration if you know the takeoff and landing times in the same time zone.' },
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
                             <h3 className="font-bold text-slate-900 mb-2">Privacy</h3>
                             <p className="text-sm text-slate-600">
                                 Your inputs are processed instantly in your browser. No data is sent to our servers.
                             </p>
                         </div>
                     </section>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Related Time Tools</h3>
                    <ul className="space-y-3">
                        <button onClick={() => onNavigate && onNavigate('calculator-date-time')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Date & Time Calculator
                        </button>
                        <button onClick={() => onNavigate && onNavigate('calculator-working-days')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Working Days Calculator
                        </button>
                    </ul>
                 </div>
            </div>

         </div>
      </div>
    </div>
  );
};
export default TimeDurationPage;