
import React from 'react';
import { AlertTriangle, BookOpen, Scale } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last Updated: October 2023</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Important Disclaimer</h3>
              <p className="text-amber-800 leading-relaxed text-sm">
                The content and tools on CalcBrew are for <strong>informational and educational purposes only</strong>. They should not be considered professional financial, medical, or legal advice. Always consult with a qualified professional before making decisions based on these calculations.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-400" />
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing or using the CalcBrew website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-slate-400" />
              2. Use License
            </h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on CalcBrew's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="mb-2">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose;</li>
              <li>attempt to reverse engineer any software contained on CalcBrew's website;</li>
              <li>remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Accuracy of Materials</h2>
            <p className="mb-4">
              The materials appearing on CalcBrew's website could include technical, typographical, or photographic errors. CalcBrew does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall CalcBrew or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CalcBrew's website, even if CalcBrew has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
