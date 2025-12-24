
import React from 'react';
import { Briefcase, MapPin, Users, Heart } from 'lucide-react';

const CareersPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-16 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Join Our Team</h1>
          <p className="text-lg text-slate-600">
            Help us build the world's best free utility tools.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        
        {/* Culture Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Remote First</h3>
            <p className="text-slate-600 text-sm">We believe talent is everywhere. Work from anywhere in the world.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Small Team</h3>
            <p className="text-slate-600 text-sm">We are a lean, agile team where every contribution matters.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">User Focused</h3>
            <p className="text-slate-600 text-sm">We don't build features for sake of it. We solve real user problems.</p>
          </div>
        </div>

        {/* Openings Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
            <Briefcase className="w-6 h-6 text-slate-400" />
            Current Openings
          </h2>

          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-slate-500 mb-4 font-medium">No open positions right now</p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              We are not currently hiring for any specific roles. However, we are always interested in connecting with talented developers and designers.
            </p>
            <div className="mt-8 pt-8 border-t border-slate-100">
               <p className="text-sm text-slate-500">
                 Follow us on social media to stay updated on future opportunities.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;
