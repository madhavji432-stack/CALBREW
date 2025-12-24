import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, Droplets, Activity } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const WaterIntakeCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<string>('');
  const [activity, setActivity] = useState<string>('0'); // minutes of exercise

  const [result, setResult] = useState<{ liters: number, cups: number } | null>(null);

  useEffect(() => {
    setResult(null);

    const w = parseFloat(weight);
    const exerciseMins = parseFloat(activity) || 0;

    if (isNaN(w) || w <= 0) return;

    let intakeLiters = 0;

    if (unit === 'metric') {
      // Basic rule: 35ml per kg of body weight
      intakeLiters = w * 0.033;
    } else {
      // Basic rule: weight in lbs / 2 = oz. Convert oz to liters (1 oz = 0.0295735 L)
      const weightInOz = w / 2;
      intakeLiters = weightInOz * 0.0295735;
    }

    // Add activity: ~0.35L (12oz) per 30 mins of exercise
    const extraWater = (exerciseMins / 30) * 0.35;
    intakeLiters += extraWater;

    setResult({
        liters: parseFloat(intakeLiters.toFixed(2)),
        cups: Math.round(intakeLiters * 4.22675) // approx 1 liter = 4.2 cups
    });

  }, [weight, activity, unit]);

  const handleReset = () => {
    setWeight('');
    setActivity('0');
    setResult(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Daily Water Intake Calculator - Hydration Calculator</h1>
        <p>Calculate exactly how much water you should drink daily based on your weight and activity level. Stay hydrated and healthy.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Daily Water Intake Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Proper hydration is key to health, energy, and focus. Use this tool to estimate your daily water needs based on your body weight and exercise habits.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              
              {/* Controls */}
              <div className="flex bg-slate-100 p-1 rounded-lg mb-8 max-w-xs">
                <button onClick={() => setUnit('metric')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${unit === 'metric' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Metric (kg)</button>
                <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${unit === 'imperial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Imperial (lbs)</button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                   <input
                     type="number"
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     placeholder={unit === 'metric' ? '70' : '150'}
                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Daily Exercise (minutes)</label>
                   <input
                     type="number"
                     value={activity}
                     onChange={(e) => setActivity(e.target.value)}
                     placeholder="30"
                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                   />
                </div>
              </div>

              {/* Result Box */}
              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                result !== null ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                  {result !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">
                        Recommended Daily Intake
                      </span>
                      <div className="flex items-center justify-center gap-3">
                        <Droplets className="w-8 h-8 text-blue-500" />
                        <span className="text-6xl font-extrabold text-slate-900 tracking-tight">
                          {result.liters}L
                        </span>
                      </div>
                      <p className="text-slate-500 mt-2 text-lg font-medium">approx. {result.cups} cups</p>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Activity className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium">Enter weight to see hydration needs</p>
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
              <ol className="list-decimal pl-5 space-y-4 text-slate-600">
                <li><strong>Enter Weight:</strong> Your water needs are directly related to your body mass. Heavier individuals require more water.</li>
                <li><strong>Add Activity:</strong> Exercise causes fluid loss through sweat. We add extra water recommendations for every 30 minutes of activity.</li>
                <li><strong>Get Result:</strong> We provide a baseline goal in Liters and cups to help you track throughout the day.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculation Logic</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The general recommendation is based on the formula: Body Weight (kg) × 0.033 = Liters of water.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For exercise, we add approximately 0.35 Liters (12 oz) for every 30 minutes of moderate activity to compensate for fluid loss.
              </p>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'Why is hydration important?', a: 'Water regulates body temperature, lubricates joints, prevents infections, and delivers nutrients to cells.' },
                  { q: 'Does coffee or tea count?', a: 'Yes, but pure water is best. Caffeinated drinks can have a mild diuretic effect, though they still contribute to fluid intake.' },
                  { q: 'Can I drink too much water?', a: 'Yes, water intoxication (hyponatremia) is rare but possible if you drink excessive amounts very quickly.' },
                  { q: 'Should I drink more in summer?', a: 'Absolutely. Hot weather increases sweating, so you need to drink more to replace lost fluids.' },
                  { q: 'Is this calculator free?', a: 'Yes, completely free.' }
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
              <h3 className="font-bold text-slate-900 mb-4">Related Health Tools</h3>
              <ul className="space-y-3">
                {[
                  { name: 'BMI Calculator', id: 'calculator-bmi' },
                  { name: 'BMR Calculator', id: 'calculator-bmr' },
                  { name: 'Ideal Weight Calculator', id: 'calculator-ideal-weight' },
                  { name: 'Daily Water Intake', id: 'calculator-water-intake', active: true },
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

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
               <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <h4 className="font-bold text-amber-900">Disclaimer</h4>
               </div>
               <p className="text-sm text-amber-800 leading-relaxed">
                  This calculator provides general estimates. Individual needs vary by climate, health conditions, and pregnancy. Consult a doctor for specific advice.
               </p>
            </div>

             <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-4">Why use CalcBrew?</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Simple:</strong> Easy inputs.</span>
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

export default WaterIntakeCalculatorPage;