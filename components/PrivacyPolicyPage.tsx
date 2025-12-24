
import React from 'react';
import { Lock, Eye, Server, Shield } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last Updated: October 2023</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
            <Lock className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Our Core Promise</h3>
              <p className="text-slate-600 leading-relaxed">
                We believe your data belongs to you. Our calculators are designed to process information locally on your device whenever possible. We do not sell your personal information to third parties.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-slate-400" />
              1. Information We Collect
            </h2>
            <p className="mb-4">
              <strong>Personal Input Data:</strong> The numbers and data you enter into our calculators (such as salary, weight, loan amounts) are processed within your web browser. This data is not sent to our servers for storage.
            </p>
            <p>
              <strong>Usage Data:</strong> We may collect anonymous, aggregated data about how our website is accessed and used. This includes device type, browser version, and pages visited. This helps us optimize the user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-slate-400" />
              2. How We Use Information
            </h2>
            <p className="mb-4">
              We use the anonymous information we collect solely for the purpose of:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Providing and maintaining our Service</li>
              <li>Monitoring the usage of our Service</li>
              <li>Detecting, preventing, and addressing technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-400" />
              3. Data Security
            </h2>
            <p className="mb-4">
              The security of your data is important to us. Since we do not store your personal inputs on our servers, the risk of a data breach involving your financial or health data via our platform is virtually non-existent.
            </p>
            <p>
              However, remember that no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Third-Party Services</h2>
            <p className="mb-4">
              We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, or to assist us in analyzing how our Service is used (e.g., Google Analytics).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via our Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
