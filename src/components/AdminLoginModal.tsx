import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldAlert, Key, Mail, Lock } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { loginAdmin, adminLoginOpen, setAdminLoginOpen } = useApp();
  
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!adminLoginOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await loginAdmin(email, passcode);
      if (success) {
        setAdminLoginOpen(false);
      } else {
        setError('Incorrect administrator credentials.');
      }
    } catch (err) {
      setError('An unexpected system error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={() => setAdminLoginOpen(false)} 
      />

      {/* Admin Terminal Card */}
      <div className="relative w-full max-w-sm rounded-none border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] z-10">
        
        {/* Decorative Corner Tabs */}
        <div className="absolute -top-3 -left-3 bg-slate-900 text-[9px] font-mono text-white px-2 py-0.5 uppercase tracking-widest font-black border border-slate-900">
          SECURE GATEWAY
        </div>

        {/* Close Button */}
        <button
          onClick={() => setAdminLoginOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-white rounded-none hover:bg-slate-900 border-2 border-slate-900 transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Terminal Header */}
        <div className="text-center mt-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-none bg-slate-900 text-white font-black shadow-[3px_3px_0px_0px_rgba(244,63,94,1)] border-2 border-slate-900 mx-auto mb-3">
            <Lock className="h-5 w-5 text-rose-500 animate-pulse" />
          </div>
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight font-display">
            Web Admin Portal
          </h2>
          <p className="text-[11px] font-bold text-slate-500 mt-1.5 leading-normal">
            Enter administrative credentials to unlock the systems and access client records.
          </p>
        </div>

        {/* Error panel */}
        {error && (
          <div className="flex gap-2 text-xs text-rose-700 bg-rose-50 border-2 border-rose-600 p-2.5 rounded-none mb-4 font-bold items-center">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Admin Email</label>
            <div className="relative border-2 border-slate-900 bg-slate-50 text-slate-900 rounded-none focus-within:bg-white">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="admin@soulverseapps.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none font-semibold font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">System Passcode</label>
            <div className="relative border-2 border-slate-900 bg-slate-50 text-slate-900 rounded-none focus-within:bg-white">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none font-semibold font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-bold uppercase tracking-wider text-xs rounded-none transition-all shadow-[3px_3px_0px_0px_rgba(244,63,94,1)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
          >
            {loading ? 'Decrypting...' : 'Authenticate Access'}
          </button>
        </form>

        {/* Security Warning Footnote */}
        <div className="mt-5 border-t border-slate-200 pt-3 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            IP logs and telemetry active. Unauthorized access is recorded.
          </p>
        </div>

      </div>
    </div>
  );
};
