import React, { useState } from 'react';
interface PageProps { onNavigate?: (view: string) => void; }

const FractionCalculatorPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [n1, setN1] = useState('');
  const [d1, setD1] = useState('');
  const [n2, setN2] = useState('');
  const [d2, setD2] = useState('');
  const [op, setOp] = useState('+');
  const [res, setRes] = useState<{n:number, d:number} | null>(null);

  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

  const calc = () => {
    const num1 = parseInt(n1), den1 = parseInt(d1);
    const num2 = parseInt(n2), den2 = parseInt(d2);
    if (!den1 || !den2) return;
    
    let resN = 0, resD = den1 * den2;
    if (op === '+') resN = num1 * den2 + num2 * den1;
    if (op === '-') resN = num1 * den2 - num2 * den1;
    if (op === '*') { resN = num1 * num2; resD = den1 * den2; }
    if (op === '/') { resN = num1 * den2; resD = den1 * num2; }

    const common = gcd(Math.abs(resN), resD);
    setRes({ n: resN/common, d: resD/common });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-12 pb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Fraction Calculator</h1>
      </section>
      <div className="max-w-lg mx-auto px-4 py-10">
         <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center space-y-6">
            <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1"><input className="w-16 p-2 border rounded text-center" placeholder="1" value={n1} onChange={e=>setN1(e.target.value)} /><div className="h-0.5 bg-slate-300"></div><input className="w-16 p-2 border rounded text-center" placeholder="2" value={d1} onChange={e=>setD1(e.target.value)} /></div>
                <select className="p-2 border rounded text-xl font-bold" value={op} onChange={e=>setOp(e.target.value)}><option>+</option><option>-</option><option>*</option><option>/</option></select>
                <div className="flex flex-col gap-1"><input className="w-16 p-2 border rounded text-center" placeholder="1" value={n2} onChange={e=>setN2(e.target.value)} /><div className="h-0.5 bg-slate-300"></div><input className="w-16 p-2 border rounded text-center" placeholder="4" value={d2} onChange={e=>setD2(e.target.value)} /></div>
                <span className="text-2xl font-bold">=</span>
                {res ? (
                    <div className="flex flex-col gap-1 items-center font-bold text-xl text-primary-600"><span>{res.n}</span><div className="h-0.5 bg-primary-600 w-full"></div><span>{res.d}</span></div>
                ) : <span className="text-2xl font-bold text-slate-300">?</span>}
            </div>
            <button onClick={calc} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold">Calculate</button>
         </div>
      </div>
    </div>
  );
};
export default FractionCalculatorPage;