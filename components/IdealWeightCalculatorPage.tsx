import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, Activity, Scale } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const IdealWeightCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  // Metric State
  const [heightCm, setHeightCm] = useState<string>('');
  
  // Imperial State
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');

  const [result, setResult] = useState<{ min: number, max: number, ideal: number } | null>(null);

  useEffect(() => {
    setResult(null);

    let inches = 0;

    if (unit === 'metric') {
      if (!heightCm) return;
      inches = parseFloat(heightCm) / 2.54;
    } else {
      if (!heightFt || !heightIn) return;
      inches = (parseFloat(heightFt) * 12) + parseFloat(heightIn);
    }

    if (inches <= 0) return;

    // Devine Formula (Standard)
    // Male: 50kg + 2.3kg per inch over 5ft
    // Female: 45.5kg + 2.3kg per inch over 5ft
    const heightOver5ft = inches - 60;
    
    // Base logic works best for > 5ft, but we can allow it to go slightly negative conceptually for logic or clamp it
    if (heightOver5ft < 0) {
        // Fallback for short stature or handle via BMI logic usually, but simplified here:
        // We will just return null if under 5ft for simplicity of the "Devine" formula strictness 
        // OR simply apply the subtraction (though less accurate). 
        // Let's allow negative adjustment but keep it realistic.
    }

    let idealKg = 0;
    if (gender === 'male') {
        idealKg = 50 + (2.3 * heightOver5ft);
    } else {
        idealKg = 45.5 + (2.3 * heightOver5ft);
    }

    // Range +/- 10%
    // Convert to lbs if imperial
    let displayIdeal = idealKg;
    let min = idealKg * 0.9;
    let max = idealKg * 1.1;

    if (unit === 'imperial') {
        displayIdeal = idealKg * 2.20462;
        min = min * 2.20462;
        max = max * 2.20462;
    }

    setResult({
        ideal: Math.round(displayIdeal),
        min: Math.round(min),
        max: Math.round(max)
    });

  }, [heightCm, heightFt, heightIn, unit, gender]);

  const handleReset = () => {
    setHeightCm('');
    setHeightFt('');
    setHeightIn('');
    setResult(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden">
        <h1>Ideal Weight Calculator - Find Your Healthy Weight Range</h1>
        <p>Calculate your ideal body weight based on height and gender using standard medical formulas. Free health tool for adults.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ideal Weight Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Estimate a healthy weight range for your body size. This tool uses the Devine formula, widely used by medical professionals, to determine ideal body weight based on height and gender.
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

              <div className="mb-8">
                {unit === 'metric' ? (
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
                ) : (
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
                )}
              </div>

              {/* Result Box */}
              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                result !== null ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                  {result !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-primary-600 mb-3 uppercase tracking-wider">
                        Estimated Ideal Weight
                      </span>
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <Scale className="w-8 h-8 text-primary-500" />
                        <span className="text-6xl font-extrabold text-slate-900 tracking-tight">
                          {result.ideal}
                        </span>
                        <span className="text-xl font-medium text-slate-500 self-end mb-2">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                      </div>
                      <p className="text-slate-500 text-sm font-medium">Healthy Range: {result.min} - {result.max} {unit === 'metric' ? 'kg' : 'lbs'}</p>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Activity className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium">Enter height to see ideal weight</p>
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
                <li><strong>Enter Height:</strong> Taller individuals naturally have a higher healthy weight baseline.</li>
                <li><strong>Select Gender:</strong> Men typically have more muscle mass and heavier bone density than women of the same height, affecting ideal weight estimates.</li>
                <li><strong>View Range:</strong> We provide a specific target number and a broader range (±10%) to account for body frame differences.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Devine Formula</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                This calculator uses the Devine Formula (1974), which was originally developed to calculate dosing for medications but became the standard for ideal weight estimation.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-700">
                <strong>Men:</strong> 50 kg + 2.3 kg per inch over 5 feet<br/><br/>
                <strong>Women:</strong> 45.5 kg + 2.3 kg per inch over 5 feet
              </div>
            </section>

            <section className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Example Calculation</h3>
              <p className="text-slate-700 mb-2"><strong>Profile:</strong> Male, 5ft 10in (178cm).</p>
              <p className="text-slate-700"><strong>Result:</strong> Ideal Weight: ~161 lbs (73 kg)</p>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'Is there really one "ideal" weight?', a: 'No. "Ideal weight" is a statistical estimate. Healthy weight varies based on muscle mass, bone density, and age.' },
                  { q: 'Does this calculator account for muscle?', a: 'No. The Devine formula does not differentiate between fat and muscle. Bodybuilders may weigh more than the "ideal" but still be healthy.' },
                  { q: 'Why is there a separate range?', a: 'We provide a ±10% range because people have different body frame sizes (small, medium, large).' },
                  { q: 'Is this the same as BMI?', a: 'Not exactly. BMI calculates a ratio based on weight and height. Ideal Weight calculates a specific target weight based on height.' },
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
                  { name: 'BMR Calculator', id: 'calculator-bmr' },
                  { name: 'Daily Water Intake', id: 'calculator-water-intake' },
                  { name: 'Ideal Weight Calculator', id: 'calculator-ideal-weight', active: true },
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
                  Calculations are based on the Devine formula. This tool is for educational purposes only and not a substitute for professional medical advice.
               </p>
            </div>

             <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-4">Why use CalcBrew?</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Accurate:</strong> Standard formulas.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5"></div>
                  <span><strong>Fast:</strong> Live results.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IdealWeightCalculatorPage;