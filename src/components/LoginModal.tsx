import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, ShieldCheck, HelpCircle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { registerUser, loginUser, resetPassword } = useApp();
  
  const [activeForm, setActiveForm] = useState<'login' | 'register' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (activeForm === 'login') {
        const success = await loginUser(email);
        if (success) {
          onClose();
        } else {
          setError('Invalid login credentials.');
        }
      } else if (activeForm === 'register') {
        if (!name.trim()) {
          setError('Name is required.');
          setLoading(false);
          return;
        }
        const success = await registerUser(name, email);
        if (success) {
          onClose();
        }
      } else {
        const msg = await resetPassword(email);
        setMessage(msg);
      }
    } catch (err) {
      setError('An unexpected error occurred during authorization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm rounded-none border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] z-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-900 rounded-none hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Form Header */}
        <div className="text-center mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-none bg-slate-900 text-white font-black shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] border-2 border-slate-900 mx-auto mb-3 font-display text-sm">
            S
          </div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight font-display">
            {activeForm === 'login' && 'Sign In to Soulverse'}
            {activeForm === 'register' && 'Register Developer'}
            {activeForm === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-[11px] font-medium text-slate-500 mt-1 leading-normal">
            {activeForm === 'login' && 'Access purchased source packages and invoice histories.'}
            {activeForm === 'register' && 'Join global developers obtaining premium digital licenses.'}
            {activeForm === 'forgot' && 'Provide your email to receive an authorization link.'}
          </p>
        </div>

        {/* Feedback panels */}
        {error && <p className="text-xs text-rose-700 bg-rose-50 border-2 border-rose-600 p-2.5 rounded-none mb-4 text-center font-bold">{error}</p>}
        {message && <p className="text-xs text-emerald-700 bg-emerald-50 border-2 border-emerald-600 p-2.5 rounded-none mb-4 text-center font-bold">{message}</p>}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {activeForm === 'register' && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Full Name</label>
              <div className="relative border-2 border-slate-900 bg-slate-50 text-slate-900 rounded-none focus-within:bg-white">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Zayn Malik"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none font-semibold"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Email Address</label>
            <div className="relative border-2 border-slate-900 bg-slate-50 text-slate-900 rounded-none focus-within:bg-white">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="e.g. dev@soulverseapps.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none font-semibold"
              />
            </div>
          </div>

          {activeForm !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Password</label>
                {activeForm === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => setActiveForm('forgot')}
                    className="text-[10px] text-slate-500 hover:text-indigo-600 font-bold uppercase tracking-wider font-mono"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative border-2 border-slate-900 bg-slate-50 text-slate-900 rounded-none focus-within:bg-white">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none font-semibold"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-bold uppercase tracking-wider text-xs rounded-none transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
          >
            {loading ? 'Processing...' : activeForm === 'login' ? 'Sign In' : activeForm === 'register' ? 'Register Account' : 'Send Reset Link'}
          </button>
        </form>

        {/* Form Switchers */}
        <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-500 space-y-2">
          {activeForm === 'login' ? (
            <>
              <p className="font-medium text-slate-600">Don't have a profile yet? <button onClick={() => setActiveForm('register')} className="text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:underline">Register</button></p>
            </>
          ) : activeForm === 'register' ? (
            <p className="font-medium text-slate-600">Already a member? <button onClick={() => setActiveForm('login')} className="text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:underline">Sign In</button></p>
          ) : (
            <p className="font-medium text-slate-600">Remember password? <button onClick={() => setActiveForm('login')} className="text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:underline">Back to Sign In</button></p>
          )}
        </div>

      </div>
    </div>
  );
};
