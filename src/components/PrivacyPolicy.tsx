import React from 'react';
import { Shield, Eye, Lock } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 min-h-screen text-slate-700 text-xs leading-relaxed">
      <div className="space-y-3 border-b-4 border-slate-900 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border-2 border-slate-900 text-[10px] font-black text-slate-900 uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <Shield className="h-3.5 w-3.5" />
          <span>Legal Compliance Document</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase font-display">Privacy Policy</h1>
        <p className="text-xs text-slate-500 font-bold font-mono">Effective Date: July 16, 2026 | Last updated: July 16, 2026</p>
      </div>

      <div className="space-y-5">
        <p className="text-slate-600 font-semibold">
          At <strong>Soulverse Apps</strong> (accessible via <code className="bg-slate-100 px-1.5 py-0.5 border border-slate-300 rounded-none font-mono text-[11px] text-slate-850">https://soulverseapps.com</code>), user privacy and source code security are paramount. This document clarifies the exact scopes of information we gather, compile, store, and utilize upon your interactions with our marketplace platforms.
        </p>

        <div className="space-y-2 p-5 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider font-mono border-b-2 border-slate-900 pb-1.5">
            <Eye className="h-4 w-4 text-slate-900" />
            1. Scopes of Information We Gather
          </h2>
          <p className="text-slate-600 font-semibold pt-1">
            When registering, purchasing digital items, or logging in via our authentication interfaces, we gather standard email credentials, full client names, and chosen billing methodologies. We do NOT store complete credit card or financial credentials; these are routed securely via authenticated third-party processing gateways (such as Easypaisa, JazzCash, or Stripe).
          </p>
        </div>

        <div className="space-y-2 p-5 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider font-mono border-b-2 border-slate-900 pb-1.5">
            <Lock className="h-4 w-4 text-slate-900" />
            2. Code Security & Data Processing
          </h2>
          <p className="text-slate-600 font-semibold pt-1">
            We process client data exclusively to manage purchase histories, deliver instant download files, authorize licensing parameters, and distribute optional software revision newsletters. We do not distribute or trade customer emails or profiles to third-party marketing brokers.
          </p>
        </div>

        <div className="space-y-2 p-5 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider font-mono border-b-2 border-slate-900 pb-1.5">
            3. Client Rights & Deletion Request
          </h2>
          <p className="text-slate-600 font-semibold pt-1">
            You retain absolute authorization to query, correct, or request deletion of your complete administrative and client logs. To initiate a full records purge from our database systems, please transmit an authenticated email request directly to our technical support team at <code className="bg-slate-100 px-1.5 py-0.5 border border-slate-300 rounded-none font-mono text-[11px] text-slate-850">support@soulverseapps.com</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
