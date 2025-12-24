
import React from 'react';
import { ShieldCheck, Zap, Globe, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-16 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">About CalcBrew</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We build simple, accurate, and privacy-focused tools to help you solve everyday math problems in seconds.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our mission is to democratize access to complex calculations. Whether you are a student checking homework, a professional planning a loan, or someone trying to live a healthier life, you deserve tools that are fast, free, and easy to understand.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We believe that you shouldn't need a degree in finance or engineering to get a straight answer. We strip away the complexity and provide you with instant results.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why We Are Different</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Most online calculators are cluttered with ads, slow to load, or require invasive sign-ups. CalcBrew is different.
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary-600" />
                <span className="text-slate-700"><strong>Privacy First:</strong> Calculations happen on your device.</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary-600" />
                <span className="text-slate-700"><strong>Speed:</strong> No server lag. Instant answers.</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary-600" />
                <span className="text-slate-700"><strong>Accessibility:</strong> Designed for everyone, everywhere.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 text-center shadow-sm">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Completely Free</h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            CalcBrew is a passion project dedicated to providing high-quality utility software for free. We are supported by minimal, non-intrusive advertising to keep the servers running. We will never charge you for basic calculations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
