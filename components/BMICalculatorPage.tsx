import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, RefreshCcw, Info, Activity } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

const BMICalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric State
  const [heightCm, setHeightCm] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  
  // Imperial State
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');
  const [weightLbs, setWeightLbs] = useState<string>('');

  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    setBmi(null);
    setCategory('');

    let h = 0; // height in meters
    let w = 0; // weight in kg

    if (unit === 'metric') {
      if (!heightCm || !weightKg) return;
      h = parseFloat(heightCm) / 100;
      w = parseFloat(weightKg);
    } else {
      if (!heightFt || !heightIn || !weightLbs) return;
      const totalInches = (parseFloat(heightFt) * 12) + parseFloat(heightIn);
      h = totalInches * 0.0254;
      w = parseFloat(weightLbs) * 0.453592;
    }

    if (h <= 0 || w <= 0) return;

    const bmiValue = w / (h * h);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal weight');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');

  }, [heightCm, weightKg, heightFt, heightIn, weightLbs, unit]);

  const handleReset = () => {
    setHeightCm('');
    setWeightKg('');
    setHeightFt('');
    setHeightIn('');
    setWeightLbs('');
    setBmi(null);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Normal weight': return 'text-green-600 bg-green-50 border-green-200';
      case 'Overweight': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Obese': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 sm:pb-20">
      <div className="hidden">
        <h1>BMI Calculator - Calculate Your Body Mass Index</h1>
        <p>Free online BMI Calculator for men, women, and children. Instantly check if you are in a healthy weight range based on your height and weight.</p>
      </div>

      <section className="bg-white border-b border-slate-200 pt-8 pb-8 md:pt-12 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            BMI Calculator
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Calculate your Body Mass Index (BMI) to understand your weight status. This simple tool helps you check if you are within a healthy weight range for your height.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-8">
              
              <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
                <button
                  onClick={() => setUnit('metric')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                    unit === 'metric' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Metric (kg/cm)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                    unit === 'imperial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Imperial (lbs/ft)
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
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

              <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                bmi !== null ? 'bg-primary-50 border-primary-100' : 'bg-slate-50 border-slate-100'
              }`}>
                {/* Ensure stable height for CLS prevention */}
                <div className="p-6 md:p-8 text-center min-h-[180px] flex flex-col items-center justify-center">
                  {bmi !== null ? (
                    <div className="animate-in zoom-in-95 duration-300 w-full">
                      <span className="block text-xs font-bold text-primary-600 mb-3 uppercase tracking-wider">
                        Your BMI Score
                      </span>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                          {bmi.toFixed(1)}
                        </span>
                      </div>
                      <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${getCategoryColor(category)}`}>
                        {category}
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Activity className="w-8 h-8 mb-3 opacity-50" />
                      <p className="font-medium text-sm md:text-base">Enter height and weight to see results</p>
                    </div>
                  )}
                </div>
              </div>

               {(bmi !== null) && (
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

            <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">How It Works</h2>
              <ol className="list-decimal pl-5 space-y-4 text-slate-600 text-sm md:text-base">
                <li><strong>Enter Your Details:</strong> Input your current height and weight. Toggle between metric (kg/cm) and imperial (lbs/ft) units as needed.</li>
                <li><strong>Instant Calculation:</strong> The calculator uses the standard BMI formula to generate your score instantly.</li>
                <li><strong>Check Category:</strong> Compare your score against standard World Health Organization categories to see if you are underweight, normal weight, overweight, or obese.</li>
              </ol>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-bold text-slate-900 mb-4">Related Health Tools</h3>
              <ul className="space-y-3">
                {[
                  { name: 'BMR Calculator', id: 'calculator-bmr' },
                  { name: 'Daily Water Intake', id: 'calculator-water-intake' },
                  { name: 'Ideal Weight Calculator', id: 'calculator-ideal-weight' },
                  { name: 'BMI Calculator', id: 'calculator-bmi', active: true },
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

export default BMICalculatorPage;