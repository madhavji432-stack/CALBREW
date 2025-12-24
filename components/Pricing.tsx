import React from 'react';
import { Check } from 'lucide-react';
import { PricingTier } from '../types';

const tiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for everyday quick calculations.',
    features: [
      'Unlimited basic calculators',
      'Ad-supported experience',
      'Standard accuracy',
      'Community support'
    ],
    cta: 'Start Calculating',
    highlight: false
  },
  {
    name: 'Pro',
    price: '$5',
    description: 'For power users who need history and customization.',
    features: [
      'No ads ever',
      'Save calculation history',
      'Advanced scientific tools',
      'Priority support access',
      'Export results to PDF/CSV'
    ],
    cta: 'Upgrade to Pro',
    highlight: true
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Most tools are free forever. Upgrade to remove ads and unlock advanced features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-3xl p-8 lg:p-10 flex flex-col transition-transform duration-300 ${
                tier.highlight 
                  ? 'bg-white text-slate-900 shadow-2xl scale-105 z-10 ring-4 ring-white/10' 
                  : 'bg-slate-800/50 text-white border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3">
                  <span className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                {tier.price !== '$0' && <span className="ml-1 text-base font-medium opacity-60">/month</span>}
              </div>
              <p className={`mb-8 text-sm leading-relaxed ${tier.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                {tier.description}
              </p>

              <div className={`h-px w-full mb-8 ${tier.highlight ? 'bg-slate-100' : 'bg-slate-700/50'}`}></div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className={`h-5 w-5 mr-3 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-primary-600' : 'text-primary-400'}`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                  tier.highlight
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/30 hover:shadow-xl hover:-translate-y-0.5'
                    : 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;