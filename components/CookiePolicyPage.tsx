
import React from 'react';
import { Cookie, Settings, Info } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Cookie Policy</h1>
          <p className="text-slate-500 text-sm">Last Updated: October 2023</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-12 text-slate-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-slate-400" />
              1. What Are Cookies?
            </h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-400" />
              2. How We Use Cookies
            </h2>
            <p className="mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded-lg border border-slate-200">
                <strong className="block text-slate-900 mb-1">Strictly Necessary Cookies</strong>
                <span className="text-sm">These are essential for you to browse the website and use its features. Without these cookies, services like page navigation cannot be provided.</span>
              </li>
              <li className="bg-white p-4 rounded-lg border border-slate-200">
                <strong className="block text-slate-900 mb-1">Performance & Analytics Cookies</strong>
                <span className="text-sm">These collect information about how you use our website, such as which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized.</span>
              </li>
              <li className="bg-white p-4 rounded-lg border border-slate-200">
                <strong className="block text-slate-900 mb-1">Functionality Cookies</strong>
                <span className="text-sm">These allow our website to remember choices you have made in the past, like your preferred language or the region you are in.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-400" />
              3. Managing Cookies
            </h2>
            <p className="mb-4">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.aboutcookies.org</a>.
            </p>
            <p>
              Please note that deleting cookies or disabling future cookies may prevent you from accessing certain areas or features of our site.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
