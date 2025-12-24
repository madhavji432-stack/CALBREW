import React, { useState } from 'react';
import { Moon, Sun, Clock } from 'lucide-react';

interface PageProps { onNavigate?: (view: string) => void; }

const SleepCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [wakeTime, setWakeTime] = useState('07:00');
  const [bedTimes, setBedTimes] = useState<string[]>([]);

  const calculateBedtime = () => {
    const [h, m] = wakeTime.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(h, m, 0);

    // Subtract cycles (90 mins) + 15 min fall asleep time
    // Suggest 4, 5, or 6 cycles
    const cycles = [6, 5, 4]; // 9h, 7.5h, 6h
    const times = cycles.map(c => {
        const d = new Date(wakeDate);
        d.setMinutes(d.getMinutes() - (c * 90) - 15);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    setBedTimes(times);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden"><h1>Sleep Calculator</h1></div>
      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Sleep Calculator</h1>
            <p className="text-slate-600">Calculate the perfect bedtime to wake up feeling refreshed.</p>
         </div>
      </section>

      <div className="max-w-md mx-auto px-4 py-10">
         <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <label className="block text-sm font-bold text-slate-700 mb-4">I want to wake up at:</label>
            <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="text-3xl font-bold text-center border-b-2 border-primary-200 focus:border-primary-600 outline-none w-40 mb-8 text-slate-900" />
            
            <button onClick={calculateBedtime} className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition mb-8">
                Calculate Bedtime
            </button>

            {bedTimes.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-slate-500 mb-4">You should try to fall asleep at one of these times:</p>
                    <div className="grid gap-3">
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                             <span className="block text-2xl font-bold text-indigo-700">{bedTimes[0]}</span>
                             <span className="text-xs text-indigo-500 font-bold uppercase">Best (9 Hours)</span>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                             <span className="block text-2xl font-bold text-emerald-700">{bedTimes[1]}</span>
                             <span className="text-xs text-emerald-500 font-bold uppercase">Great (7.5 Hours)</span>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                             <span className="block text-2xl font-bold text-amber-700">{bedTimes[2]}</span>
                             <span className="text-xs text-amber-500 font-bold uppercase">Good (6 Hours)</span>
                        </div>
                    </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};
export default SleepCalculatorPage;