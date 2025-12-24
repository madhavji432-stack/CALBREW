import React, { useState } from 'react';
interface PageProps { onNavigate?: (view: string) => void; }

const AverageCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string>('');

  const calc = () => {
    const nums = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return;
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    setResult(avg.toFixed(2));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-12 pb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Average Calculator</h1>
      </section>
      <div className="max-w-lg mx-auto px-4 py-10">
         <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <label className="font-bold">Enter numbers separated by comma:</label>
            <textarea className="w-full p-4 border rounded-lg h-32" placeholder="10, 20, 30, 40..." value={input} onChange={e => setInput(e.target.value)}></textarea>
            <button onClick={calc} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold">Calculate Average</button>
            {result && <div className="text-center text-4xl font-bold pt-4 text-primary-600">{result}</div>}
         </div>
      </div>
    </div>
  );
};
export default AverageCalculatorPage;