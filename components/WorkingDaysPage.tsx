import React, { useState } from 'react';
import { Briefcase, ArrowRight, HelpCircle, ShieldCheck, Calendar, Clock } from 'lucide-react';
interface PageProps { onNavigate?: (view: string) => void; }

const WorkingDaysPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if(!start || !end) return;
    const s = new Date(start);
    const e = new Date(end);
    let count = 0;
    let curr = new Date(s);
    
    // Safety check for reverse dates
    if (s > e) {
        setResult(null);
        return;
    }

    while (curr <= e) {
        const day = curr.getDay();
        if (day !== 0 && day !== 6) count++;
        curr.setDate(curr.getDate() + 1);
    }
    // We count inclusive days in loop. Usually, "difference" implies strict span. 
    // But for "Working Days", usually people want inclusive of start/end if they are workdays.
    // The current loop includes both start and end date if they are weekdays.
    setResult(count); 
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Working Days Calculator</h1>
        <p>Calculate business days between two dates. Excludes weekends automatically. Perfect for project planning and payroll.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Working Days Calculator</h1>
          <p className="text-slate-600">Calculate the number of business days between two dates, excluding weekends.</p>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
         <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8 space-y-12">
                
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
                    <div className="space-y-4">
                        <div><label className="font-bold text-sm text-slate-700">Start Date</label><input type="date" className="w-full p-3 border rounded-lg mt-1" value={start} onChange={e => setStart(e.target.value)} /></div>
                        <div><label className="font-bold text-sm text-slate-700">End Date</label><input type="date" className="w-full p-3 border rounded-lg mt-1" value={end} onChange={e => setEnd(e.target.value)} /></div>
                        <button onClick={calculate} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition">Calculate Business Days</button>
                    </div>
                    {result !== null && (
                        <div className="text-center pt-4 border-t border-slate-100">
                            <span className="text-5xl font-bold text-slate-900">{result}</span>
                            <span className="block text-slate-500 font-medium mt-1">Business Days</span>
                            <p className="text-xs text-slate-400 mt-2">(Includes start and end date if they are weekdays)</p>
                        </div>
                    )}
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Working Days Calculator?</h2>
                        <p className="text-slate-600 leading-relaxed">
                            A Working Days Calculator helps you determine the number of workdays available between two calendar dates by automatically removing Saturdays and Sundays. This is essential for project management, human resources, and supply chain logistics where "business days" matter more than calendar days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Uses</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Calculating payroll periods',
                                'Estimating project delivery dates',
                                'Tracking notice periods for resignation',
                                'Shipping and logistics planning',
                                'Visa processing timelines',
                                'Academic semester planning'
                            ].map((use, i) => (
                                <li key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 text-slate-700 font-medium text-sm">
                                    <Briefcase className="w-4 h-4 text-blue-600" /> {use}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Example Scenario</h3>
                        <p className="text-slate-600 mb-4">
                            A project starts on <strong>Friday, December 1st</strong> and ends on <strong>Monday, December 11th</strong>.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
                            <li>Total calendar days: 11 days</li>
                            <li>Weekends: Dec 2-3 (Sat/Sun), Dec 9-10 (Sat/Sun)</li>
                            <li><strong>Result:</strong> 7 Working Days</li>
                        </ul>
                    </section>

                    <section>
                         <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                         <div className="space-y-4">
                             {[
                                 { q: 'Does this calculator exclude public holidays?', a: 'Currently, this tool only excludes standard weekends (Saturday and Sunday). It does not automatically account for national holidays as these vary by country.' },
                                 { q: 'Is the start date included in the count?', a: 'Yes, this calculation is inclusive. If the start date is a weekday, it counts as Day 1.' },
                                 { q: 'What is the standard number of working days in a year?', a: 'A standard year typically has about 260-262 working days before holidays are deducted.' },
                                 { q: 'Why do business days matter?', a: 'Contracts, banking transactions, and shipping guarantees operate on business days. Counting weekends can lead to missed deadlines.' },
                                 { q: 'Can I calculate past dates?', a: 'Yes, you can enter dates from the past to audit payroll or check historical timelines.' },
                                 { q: 'Is this calculator free?', a: 'Yes, accurate and free to use.' }
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
                             <h3 className="font-bold text-slate-900 mb-2">Note on Accuracy</h3>
                             <p className="text-sm text-slate-600">
                                 Please double-check specific national or regional holidays for your country, as this tool assumes a standard Monday-Friday work week without holiday interruptions.
                             </p>
                         </div>
                     </section>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Related Time Tools</h3>
                    <ul className="space-y-3">
                        <button onClick={() => onNavigate && onNavigate('calculator-date-diff')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Date Difference
                        </button>
                        <button onClick={() => onNavigate && onNavigate('calculator-time-duration')} className="flex items-center w-full text-slate-600 hover:text-primary-600">
                             <ArrowRight className="w-4 h-4 mr-2" /> Time Duration
                        </button>
                    </ul>
                 </div>
            </div>

         </div>
      </div>
    </div>
  );
};
export default WorkingDaysPage;