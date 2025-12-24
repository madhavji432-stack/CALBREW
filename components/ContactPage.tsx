
import React, { useState } from 'react';
import { Mail, MessageSquare, AlertCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 pt-16 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">
            Have a suggestion, found a bug, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-xl mx-auto px-4 py-12">
        
        {/* Disclaimer Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-900 mb-1">Please Note</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              We provide software tools for informational purposes only. We cannot provide individual financial advice, medical diagnoses, or personalized calculation support.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
            <p className="text-slate-600 mb-6">Thank you for reaching out. We will get back to you as soon as possible.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
              <select 
                id="subject"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow bg-white"
              >
                <option>General Inquiry</option>
                <option>Report a Bug</option>
                <option>Feature Request</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea 
                id="message" 
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-shadow"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Alternatively, you can email us directly at:</p>
          <a href="mailto:support@calcbrew.com" className="text-primary-600 font-semibold hover:underline mt-1 block">
            support@calcbrew.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
