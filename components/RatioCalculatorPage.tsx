import React, { useState } from 'react';
interface PageProps { onNavigate?: (view: string) => void; }

const RatioCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const d = (a && b && c) ? ((parseFloat(b) * parseFloat(c)) / parseFloat(a)).toFixed(2) : '?';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-12 pb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Ratio Calculator</h1>
      </section>
      <div className="max-w-lg mx-auto px-4 py-10">
         <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <div className="flex items-center justify-center gap-2 text-xl font-bold mb-4">
                <input className="w-16 p-2 border rounded" value={a} onChange={e => setA(e.target.value)} placeholder="A" />
                <span>:</span>
                <input className="w-16 p-2 border rounded" value={b} onChange={e => setB(e.target.value)} placeholder="B" />
                <span>=</span>
                <input className="w-16 p-2 border rounded" value={c} onChange={e => setC(e.target.value)} placeholder="C" />
                <span>:</span>
                <div className="w-16 p-2 bg-slate-100 rounded text-primary-600">{d}</div>
            </div>
            <p className="text-slate-500">Solve for X where A:B = C:X</p>
         </div>
      </div>
    </div>
  );
};
export default RatioCalculatorPage;