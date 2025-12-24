import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCcw, Scale, Ruler, Thermometer } from 'lucide-react';

interface PageProps {
  onNavigate?: (view: string) => void;
}

type Category = 'length' | 'weight' | 'temp';

const UnitConverterPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [category, setCategory] = useState<Category>('length');
  const [val, setVal] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [result, setResult] = useState<string>('');

  const definitions: Record<Category, { name: string; units: Record<string, string>; icon: any }> = {
    length: {
      name: 'Length',
      icon: Ruler,
      units: { m: 'Meters', ft: 'Feet', cm: 'Centimeters', in: 'Inches', km: 'Kilometers', mi: 'Miles' }
    },
    weight: {
      name: 'Weight',
      icon: Scale,
      units: { kg: 'Kilograms', lbs: 'Pounds', g: 'Grams', oz: 'Ounces' }
    },
    temp: {
      name: 'Temperature',
      icon: Thermometer,
      units: { c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin' }
    }
  };

  useEffect(() => {
    if (val === '') {
      setResult('');
      return;
    }
    const v = parseFloat(val);
    if (isNaN(v)) return;

    let res = 0;

    if (category === 'length') {
      // Convert to meters first
      let meters = 0;
      if (fromUnit === 'm') meters = v;
      else if (fromUnit === 'ft') meters = v / 3.28084;
      else if (fromUnit === 'cm') meters = v / 100;
      else if (fromUnit === 'in') meters = v / 39.3701;
      else if (fromUnit === 'km') meters = v * 1000;
      else if (fromUnit === 'mi') meters = v * 1609.34;

      // Convert from meters to target
      if (toUnit === 'm') res = meters;
      else if (toUnit === 'ft') res = meters * 3.28084;
      else if (toUnit === 'cm') res = meters * 100;
      else if (toUnit === 'in') res = meters * 39.3701;
      else if (toUnit === 'km') res = meters / 1000;
      else if (toUnit === 'mi') res = meters / 1609.34;
    } 
    else if (category === 'weight') {
       // Convert to kg
       let kg = 0;
       if (fromUnit === 'kg') kg = v;
       else if (fromUnit === 'lbs') kg = v / 2.20462;
       else if (fromUnit === 'g') kg = v / 1000;
       else if (fromUnit === 'oz') kg = v / 35.274;

       if (toUnit === 'kg') res = kg;
       else if (toUnit === 'lbs') res = kg * 2.20462;
       else if (toUnit === 'g') res = kg * 1000;
       else if (toUnit === 'oz') res = kg * 35.274;
    }
    else if (category === 'temp') {
        // C as base
        let c = 0;
        if (fromUnit === 'c') c = v;
        else if (fromUnit === 'f') c = (v - 32) * 5/9;
        else if (fromUnit === 'k') c = v - 273.15;

        if (toUnit === 'c') res = c;
        else if (toUnit === 'f') res = (c * 9/5) + 32;
        else if (toUnit === 'k') res = c + 273.15;
    }

    setResult(res.toFixed(4).replace(/\.?0+$/, ''));
  }, [val, fromUnit, toUnit, category]);

  // Reset units when category changes
  const changeCategory = (c: Category) => {
    setCategory(c);
    if (c === 'length') { setFromUnit('m'); setToUnit('ft'); }
    if (c === 'weight') { setFromUnit('kg'); setToUnit('lbs'); }
    if (c === 'temp') { setFromUnit('c'); setToUnit('f'); }
    setVal('');
    setResult('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="hidden"><h1>Unit Converter</h1></div>
      <section className="bg-white border-b border-slate-200 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Unit Converter</h1>
          <p className="text-lg text-slate-600 max-w-2xl">Quickly convert between different units of measurement for Length, Weight, and Temperature.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              {/* Category Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
                {(['length', 'weight', 'temp'] as Category[]).map(c => {
                   const Icon = definitions[c].icon;
                   return (
                    <button key={c} onClick={() => changeCategory(c)} className={`flex-1 py-3 text-sm font-semibold rounded-md flex items-center justify-center gap-2 ${category === c ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}>
                        <Icon className="w-4 h-4" /> {definitions[c].name}
                    </button>
                   );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">From</label>
                    <input type="number" value={val} onChange={e => setVal(e.target.value)} placeholder="1" className="w-full px-4 py-3 rounded-lg border border-slate-300 mb-2 text-lg" />
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                        {Object.entries(definitions[category].units).map(([k, v]) => <option key={k} value={k}>{v} ({k})</option>)}
                    </select>
                 </div>
                 <div className="flex justify-center md:pt-6"><ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" /></div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">To</label>
                    <div className="w-full px-4 py-3 rounded-lg bg-primary-50 border border-primary-100 mb-2 text-lg font-bold text-primary-700 min-h-[54px] flex items-center">
                        {result || '...'}
                    </div>
                    <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                        {Object.entries(definitions[category].units).map(([k, v]) => <option key={k} value={k}>{v} ({k})</option>)}
                    </select>
                 </div>
              </div>
            </div>
            
            <section className="bg-white rounded-xl border border-slate-200 p-8">
                <h2 className="text-xl font-bold mb-4">Common Conversions</h2>
                <ul className="grid sm:grid-cols-2 gap-2 text-slate-600">
                    <li>1 Inch = 2.54 cm</li>
                    <li>1 Kg = 2.20462 lbs</li>
                    <li>1 Mile = 1.60934 km</li>
                    <li>0°C = 32°F</li>
                </ul>
            </section>
          </div>
          
          <div className="lg:col-span-4">
             <div className="bg-white p-6 rounded-xl border border-slate-200">
               <h3 className="font-bold mb-4">Related Tools</h3>
               <button onClick={() => onNavigate && onNavigate('calculator-bmi')} className="text-primary-600 hover:underline">BMI Calculator</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverterPage;