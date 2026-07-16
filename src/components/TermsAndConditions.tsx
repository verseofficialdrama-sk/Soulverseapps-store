import React from 'react';
import { FileText, ShieldAlert, Award } from 'lucide-react';

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 min-h-screen text-slate-700 text-xs leading-relaxed">
      <div className="space-y-3 border-b-4 border-slate-900 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border-2 border-slate-900 text-[10px] font-black text-slate-900 uppercase rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <FileText className="h-3.5 w-3.5" />
          <span>Marketplace SLA Rules</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase font-display">Terms & Conditions</h1>
        <p className="text-xs text-slate-500 font-bold font-mono">Effective Date: July 16, 2026 | Last updated: July 16, 2026</p>
      </div>

      <div className="space-y-5">
        <p className="text-slate-600 font-semibold">
          Welcome to <strong>Soulverse Apps</strong>. By accessing our official marketplace at <code className="bg-slate-100 px-1.5 py-0.5 border border-slate-300 rounded-none font-mono text-[11px] text-slate-850">https://soulverseapps.com</code>, buying digital products, downloading source codes, or subscribing to our custom consulting pipelines, you consent to be bound by these Terms and Conditions.
        </p>

        <div className="space-y-2 p-5 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider font-mono border-b-2 border-slate-900 pb-1.5">
            <Award className="h-4 w-4 text-slate-900" />
            1. License Grants & Limitations
          </h2>
          <p className="text-slate-600 font-semibold pt-1">
            Upon paying for any source package, you are granted a non-exclusive, non-transferable single-use developer license. You are strictly prohibited from re-licensing, sub-licensing, selling, or hosting our compiled or raw source codes on public public repositories or competitor portals.
          </p>
        </div>

        <div className="space-y-2 p-5 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider font-mono border-b-2 border-slate-900 pb-1.5">
            <ShieldAlert className="h-4 w-4 text-slate-900" />
            2. Liability & Code Execution Disclaimer
          </h2>
          <p className="text-slate-600 font-semibold pt-1">
            Soulverse Apps source codes are delivered &ldquo;as is&rdquo;, without implied warranties of compile merchantability or fitness for specific targets. While our engineering labs perform rigorous optimization audits, the buyer remains solely responsible for testing and configuring codes on their own development systems.
          </p>
        </div>

        <div className="space-y-2 p-5 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider font-mono border-b-2 border-slate-900 pb-1.5">
            3. Account Maintenance & Abuse
          </h2>
          <p className="text-slate-600 font-semibold pt-1">
            Administrators retain complete authority to suspend or terminate accounts that attempt security bypass codes, utilize stolen financial credentials, or distribute downloaded files to un-licensed third parties.
          </p>
        </div>
      </div>
    </div>
  );
};
