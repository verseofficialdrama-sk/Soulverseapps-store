import React, { useState } from 'react';
import { MediaFile, StaffUser } from '../../types';
import { Image, Users, Plus, Trash, Check, Copy, ExternalLink, Shield, ShieldAlert, Key, HelpCircle, Edit3 } from 'lucide-react';

interface AdminMediaAndStaffProps {
  mediaFiles: MediaFile[];
  saveMediaFile: (file: MediaFile) => void;
  deleteMediaFile: (id: string) => void;
  staffUsers: StaffUser[];
  saveStaffUser: (user: StaffUser) => void;
  deleteStaffUser: (id: string) => void;
  addNotification: (message: string) => void;
}

export const AdminMediaAndStaff: React.FC<AdminMediaAndStaffProps> = ({
  mediaFiles,
  saveMediaFile,
  deleteMediaFile,
  staffUsers,
  saveStaffUser,
  deleteStaffUser,
  addNotification
}) => {
  const [activeTab, setActiveTab] = useState<'media' | 'staff'>('media');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Local upload forms simulation
  const [simName, setSimName] = useState('');
  const [simUrl, setSimUrl] = useState('');
  
  // Local Staff user form
  const [editingStaff, setEditingStaff] = useState<Partial<StaffUser> | null>(null);

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simName || !simUrl) return;

    const newMedia: MediaFile = {
      id: 'media-' + Math.random().toString(36).substr(2, 9),
      name: simName,
      url: simUrl,
      type: 'image',
      size: (Math.random() * 450 + 50).toFixed(1) + ' KB',
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    saveMediaFile(newMedia);
    setSimName('');
    setSimUrl('');
    addNotification('Media asset added to registry successfully.');
  };

  const handleCopyLink = (file: MediaFile) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    addNotification('Asset visual URL copied to system clipboard.');
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSaveStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff?.name || !editingStaff?.email) return;

    const finalStaff: StaffUser = {
      id: editingStaff.id || 'staff-' + Math.random().toString(36).substr(2, 9),
      name: editingStaff.name,
      email: editingStaff.email.toLowerCase(),
      role: editingStaff.role || 'editor',
      status: editingStaff.status || 'active',
      permissions: editingStaff.permissions || ['edit_products', 'edit_blogs']
    };

    saveStaffUser(finalStaff);
    setEditingStaff(null);
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      
      {/* Navigation sub-tabs */}
      <div className="flex border-b border-slate-200 gap-4 pb-1">
        <button
          onClick={() => { setActiveTab('media'); setEditingStaff(null); }}
          className={`pb-2 px-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[6px] ${
            activeTab === 'media' ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Dynamic Media Asset Library ({mediaFiles.length})
        </button>
        <button
          onClick={() => { setActiveTab('staff'); setEditingStaff(null); }}
          className={`pb-2 px-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[6px] ${
            activeTab === 'staff' ? 'border-rose-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          System Sub-Admins & Staff Access ({staffUsers.length})
        </button>
      </div>

      {/* ======================= MEDIA LIBRARY ======================= */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          
          {/* Simulated File Upload Form */}
          <form onSubmit={handleSimulateUpload} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none space-y-3 max-w-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <h4 className="font-black text-slate-900 uppercase font-mono tracking-widest text-[10px]">Add Image coordinate to media library</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Asset Name Reference</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., homepage-logo-banner"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-none px-2.5 py-1.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Image Asset URL (Unsplash/Direct link)</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={simUrl}
                  onChange={(e) => setSimUrl(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-none px-2.5 py-1.5 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-850 text-white font-bold uppercase rounded-none tracking-wider"
              >
                Register Asset Coordinate
              </button>
            </div>
          </form>

          {/* Grid display list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaFiles.map((file) => (
              <div key={file.id} className="bg-white border-2 border-slate-900 rounded-none shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] overflow-hidden group flex flex-col justify-between">
                
                {/* Visual thumbnail */}
                <div className="h-28 bg-slate-100 border-b border-slate-200 relative overflow-hidden">
                  <img src={file.url} alt={file.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-1 right-1 px-1 py-[1px] bg-slate-950/80 text-white font-mono text-[8px] rounded-none">
                    {file.size}
                  </span>
                </div>

                <div className="p-3 space-y-2">
                  <div>
                    <p className="font-black text-slate-900 truncate uppercase font-display text-[10px]">{file.name}</p>
                    <p className="text-[8px] text-slate-400 font-mono font-bold mt-0.5">Uploaded: {file.uploadedAt}</p>
                  </div>

                  <div className="flex gap-1 border-t border-slate-100 pt-2">
                    <button
                      onClick={() => handleCopyLink(file)}
                      className="flex-1 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-none text-[8px] font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {copiedId === file.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>Copy URL</span>
                    </button>
                    <button
                      onClick={() => deleteMediaFile(file.id)}
                      className="p-1 text-rose-600 hover:text-white hover:bg-rose-600 border border-slate-300 rounded-none transition-colors cursor-pointer"
                    >
                      <Trash className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= USERS / STAFFS REGISTRY ======================= */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          
          {!editingStaff ? (
            <>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Provision system permissions for sub-admins, content editors, and moderators. Maintain role security.
                </p>
                <button
                  onClick={() => setEditingStaff({ name: '', email: '', role: 'editor', status: 'active', permissions: ['edit_products'] })}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-none border border-slate-900 text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Plus className="h-3.5 w-3.5" /> Provision Staff
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staffUsers.map((user) => (
                  <div key={user.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 uppercase font-display">{user.name}</span>
                        <span className={`px-1.5 py-[1px] text-[8px] rounded-none border font-black uppercase ${
                          user.role === 'admin' ? 'bg-indigo-50 border-indigo-300 text-indigo-800' : 'bg-slate-100 border-slate-300 text-slate-700'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono font-bold mt-1">Email: {user.email}</p>
                      <p className="text-[9px] text-emerald-600 font-mono font-bold mt-0.5">Status: <span className="uppercase font-black">{user.status}</span></p>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => setEditingStaff({ ...user })}
                        className="p-1.5 text-slate-700 bg-white border border-slate-900 rounded-none hover:bg-slate-50 cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteStaffUser(user.id)}
                        className="p-1.5 text-rose-600 bg-white border border-slate-900 rounded-none hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveStaffSubmit} className="space-y-4 max-w-xl bg-white p-5 border-2 border-slate-900 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2">
                Provision / Edit Staff Account
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Jane Doe"
                    value={editingStaff.name || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Official Email coordinate</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={editingStaff.email || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">System Access Role</label>
                    <select
                      value={editingStaff.role || 'editor'}
                      onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value as any })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-2 py-2 font-bold uppercase text-[10px]"
                    >
                      <option value="admin">SYSTEM ADMIN</option>
                      <option value="editor">CONTENT EDITOR</option>
                      <option value="viewer">VIEWER ONLY</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Status</label>
                    <select
                      value={editingStaff.status || 'active'}
                      onChange={(e) => setEditingStaff({ ...editingStaff, status: e.target.value as any })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-2 py-2 font-bold uppercase text-[10px]"
                    >
                      <option value="active">ACTIVE STATUS</option>
                      <option value="suspended">SUSPENDED / LOCKED</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="px-4 py-2 border-2 border-slate-900 hover:bg-slate-50 rounded-none font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none border border-slate-900 font-bold uppercase tracking-wider"
                >
                  Save Access Permission
                </button>
              </div>
            </form>
          )}

          {/* Activity log simulation */}
          <div className="mt-8 p-4 bg-slate-900 border-2 border-slate-900 rounded-none font-mono text-[10px] text-emerald-400 space-y-2">
            <p className="font-black uppercase tracking-widest text-slate-400 text-[9px]">Live Administrative Access Telemetry logs</p>
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
              <p className="text-slate-500">[2026-07-16 14:02:45] - DB connection initialized from container instance. PORT: 3000</p>
              <p className="text-slate-500">[2026-07-16 14:04:12] - Decryption algorithm loaded successfully. Private key verified.</p>
              <p className="text-slate-500">[2026-07-16 14:09:56] - User "System Admin Staff" modified settings: COMPANY_NAME='{settingsUsersName()}'</p>
              <p className="text-slate-500">[2026-07-16 14:15:22] - Support reply raised on Ticket Coordinates 'ticket-k8b2d1s5'</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  function settingsUsersName() {
    return 'Soulverse Apps';
  }
};
