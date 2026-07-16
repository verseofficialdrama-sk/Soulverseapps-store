import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldAlert } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, addNotification } = useApp();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    addNotification(`Inquiry received from ${name} regarding "${subject || 'General'}". Our team will follow up.`);
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const contactOptions = [
    { label: 'Technical Support Email', value: settings.contactEmail, icon: <Mail className="h-5 w-5 text-indigo-600" /> },
    { label: 'Sales & Inquiries Phone', value: settings.contactPhone, icon: <Phone className="h-5 w-5 text-indigo-600" /> },
    { label: 'Headquarters Office', value: settings.contactAddress, icon: <MapPin className="h-5 w-5 text-indigo-600" /> }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      
      {/* Contact Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
          Contact Soulverse
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl uppercase font-display leading-none">
          Connect With Our Engineering Lab
        </h1>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          Need assistance with a purchased codebase, custom development questions, or license upgrades? Leave a message or write to us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 max-w-5xl mx-auto items-start">
        
        {/* Left contacts list card */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Official Channels</h3>
          
          <div className="space-y-3">
            {contactOptions.map((opt, i) => (
              <div key={i} className="p-4 bg-white border-2 border-slate-900 rounded-none flex gap-3.5 items-start geo-shadow-offset">
                <div className="p-2 bg-slate-50 border-2 border-slate-900 rounded-none shrink-0">
                  {opt.icon}
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest font-mono">{opt.label}</p>
                  <p className="text-xs text-slate-900 font-bold mt-0.5 leading-normal">{opt.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message submission form */}
        <div className="lg:col-span-2 bg-white border-2 border-slate-900 rounded-none p-6 relative overflow-hidden geo-shadow-offset">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1.5 flex items-center gap-2 font-display">
            <MessageSquare className="h-4.5 w-4.5 text-indigo-600" />
            Send Secure Inquiry
          </h3>
          <p className="text-xs text-slate-500 mb-6 font-medium">Our system routes messages directly to active on-duty consultants. Standard support response is under 4 hours.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zayn Malik"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Subject / Category</label>
              <input
                type="text"
                placeholder="e.g. Source code customization / Custom RFP"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-semibold transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Your Message Details</label>
              <textarea
                rows={5}
                required
                placeholder="Write details regarding your requirements, timelines or license inquiries..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-semibold transition-colors"
              />
            </div>

            {submitted && (
              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-600 text-emerald-700 rounded-none flex items-center gap-2 font-semibold">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Success! Your message was transmitted. A representative will reach out shortly.</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-none flex items-center gap-1.5 transition-all shadow-[3px_3px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 font-bold uppercase tracking-wider text-xs cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Transmit Message</span>
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};

// Small clean Helper Check Icon since check icon was used
const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
