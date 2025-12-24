import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, Activity, Flame } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const BMRCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  
  // Metric State
  const [heightCm, setHeightCm] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  
  // Imperial State
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');
  const [weightLbs, setWeightLbs] = useState<string>('');

  const [bmr, setBmr] = useState<number | null>(null);

  useEffect(() => {
    setBmr(null);

    let h = 0; // height in cm
    let w = 0; // weight in kg
    const a = parseFloat(age);

    if (isNaN(a) || a <= 0) return;

    if (unit === 'metric') {
      if (!heightCm || !weightKg) return;
      h = parseFloat(heightCm);
      w = parseFloat(weightKg);
    } else {
      if (!heightFt || !heightIn || !weightLbs) return;
      const totalInches = (parseFloat(heightFt) * 12) + parseFloat(heightIn);
      h = totalInches * 2.54;
      w = parseFloat(weightLbs) * 0.453592;
    }

    if (h <= 0 || w <= 0) return;

    // Mifflin-St Jeor Equation
    // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    let baseBmr = (10 * w) + (6.25 * h) - (5 * a);
    
    if (gender === 'male') {
        baseBmr += 5;
    } else {
        baseBmr -= 161;
    }

    setBmr(Math.round(baseBmr));

  }, [heightCm, weightKg, heightFt, heightIn, weightLbs, unit, gender, age]);

  const handleReset = () => {
    setHeightCm('');
    setWeightKg('');
    setHeightFt('');
    setHeightIn('');
    setWeightLbs('');
    setAge('');
    setBmr(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>BMR Calculator - Calculate Your Basal Metabolic Rate</h1>
        <p>Find out how many calories your body burns at rest. Essential for weight loss planning and fitness goals. Free and instant BMR calculation.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            BMR Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Your Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. Knowing this number is the first step in creating a diet plan.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                 <div className="flex bg-slate-100 p-1 rounded-lg flex-1">
                    <button onClick={() => setUnit('metric')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${unit === 'metric' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Metric</button>
                    <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${unit === 'imperial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Imperial</button>
                 </div>
                 <div className="flex bg-slate-100 p-1 rounded-lg flex-1">
                    <button onClick={() => setGender('male')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${gender === 'male' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Male</button>
                    <button onClick={() => setGender('female')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${gender === 'female' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Female</button>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Age Input */}
                 <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                    />
                 </div>

                {/* Inputs */}
                {unit === 'metric' ? (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Height (cm)</label>
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        placeholder="175"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        placeholder="70"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Height (ft)</label>
                        <input
                          type="number"
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                          placeholder="5"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">(in)</label>
                        <input
                          type="number"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          placeholder="9"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Weight (lbs)</label>
                      <input
                        type="number"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(e.target.value)}
                        placeholder="160"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow text-slate-900 text-lg"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Result Box */}
              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                bmr !== null ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                  {bmr !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-primary-600 mb-3 uppercase tracking-wider">
                        Calories / Day (At Rest)
                      </span>
                      <div className="flex items-center justify-center gap-4">
                        <Flame className="w-8 h-8 text-orange-500" />
                        <span className="text-6xl font-extrabold text-slate-900 tracking-tight">
                          {bmr.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-2 text-sm">Calories needed to maintain weight if you do nothing all day.</p>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Activity className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium">Enter details to calculate calories</p>
                    </div>
                  )}
                </div>
              </div>

               {/* Reset Button */}
               {(bmr !== null) && (
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
                <li><strong>Select Gender & Age:</strong> Metabolism varies significantly by gender and slows down with age.</li>
                <li><strong>Enter Body Stats:</strong> Your height and weight determine your body's mass and surface area, which affects energy expenditure.</li>
                <li><strong>View BMR:</strong> The result is the absolute minimum calories your body burns daily just to keep organs functioning.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Mifflin-St Jeor Formula</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use the Mifflin-St Jeor equation, which is considered the most accurate standard for estimating BMR in modern populations.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-700">
                <strong>Men:</strong> (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5<br/><br/>
                <strong>Women:</strong> (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
              </div>
            </section>

            <section className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Example Calculation</h3>
              <p className="text-slate-700 mb-2"><strong>Profile:</strong> Female, 30 years old, 165cm, 60kg.</p>
              <p className="text-slate-700"><strong>Result:</strong> ~1,340 Calories/day (BMR)</p>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'What is BMR?', a: 'BMR (Basal Metabolic Rate) is the amount of energy expended while at rest in a neutrally temperate environment.' },
                  { q: 'Does BMR include exercise?', a: 'No. BMR is strictly for resting state. To find Total Daily Energy Expenditure (TDEE), you must multiply BMR by an activity factor.' },
                  { q: 'Is this calculator accurate?', a: 'It provides a very close estimate based on averages, but individual metabolism can vary due to muscle mass and genetics.' },
                  { q: 'How can I increase my BMR?', a: 'Building muscle mass through strength training is the most effective way to increase your BMR.' },
                  { q: 'Is this calculator free?', a: 'Yes, fully free and private.' }
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
                  { name: 'Daily Water Intake', id: 'calculator-water-intake' },
                  { name: 'Ideal Weight Calculator', id: 'calculator-ideal-weight' },
                  { name: 'BMR Calculator', id: 'calculator-bmr', active: true },
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
                  This tool is for educational purposes only. Calorie needs vary by individual. Consult a nutritionist or doctor before starting any diet plan.
               </p>
            </div>

             <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-4">Why use CalcBrew?</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Accurate:</strong> Standard medical formulas.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Fast:</strong> Instant results.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BMRCalculatorPage;