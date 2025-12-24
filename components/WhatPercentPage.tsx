import React, { useState } from 'react';
interface PageProps { onNavigate?: (view: string) => void; }

const WhatPercentPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [y, setY] = useState('');
  const [x, setX] = useState('');
  const res = (parseFloat(y) && parseFloat(x)) ? (parseFloat(y) / parseFloat(x) * 100).toFixed(2) : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-12 pb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">What Percent of X is Y?</h1>
      </section>
      <div className="max-w-lg mx-auto px-4 py-10">
         <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center space-y-6">
            <div className="flex items-center justify-center gap-3 text-xl">
                <span>What percent of</span>
                <input type="number" className="w-24 p-2 border rounded text-center font-bold" value={x} onChange={e => setX(e.target.value)} placeholder="X" />
                <span>is</span>
                <input type="number" className="w-24 p-2 border rounded text-center font-bold" value={y} onChange={e => setY(e.target.value)} placeholder="Y" />
                <span>?</span>
            </div>
            {res && <div className="text-5xl font-bold text-primary-600 pt-4">{res}%</div>}
         </div>
      </div>
    </div>
  );
};
export default WhatPercentPage;