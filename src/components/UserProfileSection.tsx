import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, Mail, ShieldAlert, CheckCircle, FileDown, 
  History, Calendar, RefreshCw, Key, HelpCircle 
} from 'lucide-react';

export const UserProfileSection: React.FC = () => {
  const { 
    currentUser, updateProfile, verifyEmail, orders, products, addNotification 
  } = useApp();

  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [avatarInput, setAvatarInput] = useState(currentUser?.avatar || '');

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center space-y-4">
        <p className="text-sm font-medium text-slate-500">Please register or log in to view account profiles and downloaded license histories.</p>
      </div>
    );
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(nameInput, avatarInput || undefined);
  };

  const handleVerify = () => {
    verifyEmail();
  };

  // Find purchased product objects
  const purchasedProductsList = products.filter(p => currentUser.purchasedProducts?.includes(p.id));
  const userOrders = orders.filter(o => o.userId === currentUser.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 min-h-screen">
      
      {/* Account Header */}
      <div className="border-b-2 border-slate-900 pb-5 space-y-1">
        <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono inline-block">
          Client Center
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase font-display leading-none pt-2">Your Developer Dashboard</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">Update account credentials, track license packages, and download verified software archives.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Profile Form & Verification */}
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-none p-5 space-y-5 geo-shadow-offset">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Profile Information</h3>
            
            {/* Verification Alert banner */}
            {!currentUser.isVerified ? (
              <div className="p-3.5 bg-amber-50 border-2 border-amber-600 rounded-none text-xs space-y-2.5">
                <p className="text-amber-800 font-bold leading-normal flex items-start gap-1.5">
                  <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-amber-600" />
                  <span>Email verification is pending. Please verify to validate commercial license keys.</span>
                </p>
                <button
                  onClick={handleVerify}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase rounded-none border-2 border-amber-800 transition-colors cursor-pointer text-[10px]"
                >
                  Verify Email Now
                </button>
              </div>
            ) : (
              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-600 text-emerald-850 rounded-none text-xs flex items-center gap-2 font-bold">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Verified Commercial Developer Account</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Email Address (Immutable)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    disabled
                    value={currentUser.email}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-none pl-9 pr-3 py-2 text-slate-400 font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Full Client Name</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Avatar Image Link (Optional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={avatarInput}
                  onChange={(e) => setAvatarInput(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-none text-xs font-bold uppercase tracking-wider border-2 border-slate-900 transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Save Account Profile
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Downloads & Purchase histories */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active downloads tray */}
          <div className="bg-white border-2 border-slate-900 rounded-none p-5 space-y-4 geo-shadow-offset">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Active Source Licenses & Downloads ({purchasedProductsList.length})</h3>
            
            {purchasedProductsList.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center font-medium">No active licenses found in your catalog yet. Purchase code kits to activate downloads.</p>
            ) : (
              <div className="space-y-3">
                {purchasedProductsList.map(prod => (
                  <div key={prod.id} className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase font-display tracking-tight truncate max-w-[200px]">{prod.name}</h4>
                      <p className="text-[9px] text-slate-500 mt-1 font-mono font-bold uppercase">Build version: {prod.version} | SLA Code: {prod.downloadFile}</p>
                    </div>
                    
                    <button
                      onClick={() => alert(`Downloading authorized package: ${prod.downloadFile}. Archive size: 48.4 MB.`)}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-none text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer shrink-0 border-2 border-emerald-850 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      <span>Download Zip</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User invoices */}
          <div className="bg-white border-2 border-slate-900 rounded-none p-5 space-y-4 geo-shadow-offset">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <History className="h-4.5 w-4.5 text-indigo-600" />
              Invoice History Logs ({userOrders.length})
            </h3>
            
            {userOrders.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center font-medium">No prior billing invoices registered in this browser session.</p>
            ) : (
              <div className="space-y-3.5">
                {userOrders.map(ord => (
                  <div key={ord.id} className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-3 font-mono">
                    <div>
                      <p className="text-slate-900 font-black">{ord.id}</p>
                      <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-bold uppercase">
                        <Calendar className="h-3 w-3 text-indigo-600" /> {ord.date}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-indigo-600 font-black uppercase tracking-wider">{ord.paymentMethod}</p>
                      <p className="text-slate-900 font-black mt-1 text-sm">${ord.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
