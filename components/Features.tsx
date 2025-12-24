import React, { useState } from 'react';
import { Zap, Smartphone, ShieldCheck, Globe } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: 'Instant Results',
    description: 'Complex calculations performed in milliseconds using optimized algorithms.',
    icon: Zap,
  },
  {
    title: 'Mobile Friendly',
    description: 'Designed for a perfect experience on phones, tablets, and desktops.',
    icon: Smartphone,
  },
  {
    title: 'Privacy Focused',
    description: 'Your data stays on your device. We do not store your personal inputs.',
    icon: ShieldCheck,
  },
  {
    title: 'Works Worldwide',
    description: 'Support for multiple units, currencies, and formats global usage.',
    icon: Globe,
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose CalcBrew?</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We prioritize speed, privacy, and accuracy in every tool we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;