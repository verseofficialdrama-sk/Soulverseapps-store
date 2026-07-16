import React, { useState } from 'react';
import { ContactMessage, NewsletterSubscriber, SupportRequest } from '../../types';
import { MessageSquare, Mail, Users, Trash, Check, Eye, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminCRMProps {
  contactMessages: ContactMessage[];
  saveContactMessage: (msg: ContactMessage) => void;
  deleteContactMessage: (id: string) => void;
  newsletterSubscribers: NewsletterSubscriber[];
  deleteNewsletterSubscriber: (id: string) => void;
  supportRequests: SupportRequest[];
  saveSupportRequest: (req: SupportRequest) => void;
  deleteSupportRequest: (id: string) => void;
  replyToSupportRequest: (id: string, message: string, author: string) => void;
}

export const AdminCRM: React.FC<AdminCRMProps> = ({
  contactMessages,
  saveContactMessage,
  deleteContactMessage,
  newsletterSubscribers,
  deleteNewsletterSubscriber,
  supportRequests,
  saveSupportRequest,
  deleteSupportRequest,
  replyToSupportRequest
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'contact' | 'support' | 'newsletter'>('contact');
  const [selectedTicket, setSelectedTicket] = useState<SupportRequest | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [contactReplyText, setContactReplyText] = useState<{ [id: string]: string }>({});

  const handleToggleRead = (msg: ContactMessage) => {
    saveContactMessage({ ...msg, isRead: !msg.isRead });
  };

  const handleContactReplySubmit = (msg: ContactMessage) => {
    const text = contactReplyText[msg.id];
    if (!text) return;
    saveContactMessage({ ...msg, isRead: true, replyText: text });
    setContactReplyText(prev => ({ ...prev, [msg.id]: '' }));
  };

  const handleTicketStatusChange = (ticket: SupportRequest, newStatus: SupportRequest['status']) => {
    saveSupportRequest({ ...ticket, status: newStatus });
    if (selectedTicket?.id === ticket.id) {
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handlePostTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMessage) return;
    replyToSupportRequest(selectedTicket.id, replyMessage, 'System Admin Staff');
    
    // update local selected ticket state too
    const newReply = {
      author: 'System Admin Staff',
      message: replyMessage,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setSelectedTicket(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'in-progress',
        replies: [...(prev.replies || []), newReply]
      };
    });
    setReplyMessage('');
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      
      {/* Sub Header tabs */}
      <div className="flex border-b border-slate-200 gap-4 pb-1">
        <button
          onClick={() => { setActiveSubTab('contact'); setSelectedTicket(null); }}
          className={`pb-2 px-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[6px] ${
            activeSubTab === 'contact' ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Contact Inquiries ({contactMessages.length})
        </button>
        <button
          onClick={() => { setActiveSubTab('support'); }}
          className={`pb-2 px-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[6px] ${
            activeSubTab === 'support' ? 'border-rose-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Customer Support Tickets ({supportRequests.length})
        </button>
        <button
          onClick={() => { setActiveSubTab('newsletter'); setSelectedTicket(null); }}
          className={`pb-2 px-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[6px] ${
            activeSubTab === 'newsletter' ? 'border-emerald-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Newsletter Subscribers ({newsletterSubscribers.length})
        </button>
      </div>

      {/* ===================== CONTACT INQUIRIES ===================== */}
      {activeSubTab === 'contact' && (
        <div className="space-y-4">
          {contactMessages.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-mono font-bold border-2 border-dashed border-slate-200">
              No inquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {contactMessages.map((msg) => (
                <div key={msg.id} className={`p-4 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
                  msg.isRead ? 'bg-slate-50' : 'bg-white border-indigo-600'
                }`}>
                  <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-black text-slate-900 uppercase font-mono tracking-tight">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold ml-2 font-mono">({msg.email})</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <span className="font-mono text-slate-400 text-[10px] font-bold">{msg.date}</span>
                      <button
                        onClick={() => handleToggleRead(msg)}
                        className={`px-1.5 py-0.5 border border-slate-900 font-black text-[9px] uppercase tracking-wider rounded-none ${
                          msg.isRead ? 'bg-slate-200 text-slate-700' : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => deleteContactMessage(msg.id)}
                        className="p-1 text-rose-600 border border-slate-300 hover:bg-rose-50 rounded-none transition-colors"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <p className="font-bold text-slate-900 uppercase">Subject: {msg.subject}</p>
                    <p className="text-slate-600 whitespace-pre-wrap font-mono py-1 bg-slate-100/50 px-2 border border-slate-200 mt-1 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  {msg.replyText && (
                    <div className="mt-2 p-2 bg-emerald-50 border border-emerald-300 rounded-none text-emerald-900">
                      <p className="font-black uppercase text-[10px] tracking-widest font-mono">Staff Answer Outbox:</p>
                      <p className="font-mono mt-1 italic">"{msg.replyText}"</p>
                    </div>
                  )}

                  {!msg.replyText && (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        placeholder="Draft response and transmit to inbox..."
                        value={contactReplyText[msg.id] || ''}
                        onChange={(e) => setContactReplyText(prev => ({ ...prev, [msg.id]: e.target.value }))}
                        className="flex-1 bg-white border border-slate-300 rounded-none px-2.5 py-1.5"
                      />
                      <button
                        onClick={() => handleContactReplySubmit(msg)}
                        className="px-4 py-1.5 bg-slate-900 hover:bg-slate-850 text-white font-bold uppercase rounded-none tracking-wider"
                      >
                        Send Email Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================== SUPPORT TICKETS DESK ===================== */}
      {activeSubTab === 'support' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tickets list */}
          <div className="md:col-span-1 space-y-3">
            <h4 className="font-black text-slate-900 uppercase font-mono tracking-widest border-b border-slate-200 pb-2">Active Support Tickets ({supportRequests.length})</h4>
            
            {supportRequests.length === 0 ? (
              <p className="text-slate-400 font-mono py-4">No tickets reported.</p>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {supportRequests.map((req) => {
                  const priorityColors = {
                    low: 'bg-slate-100 text-slate-600 border-slate-300',
                    medium: 'bg-amber-50 text-amber-800 border-amber-300',
                    high: 'bg-rose-50 text-rose-800 border-rose-300'
                  };
                  const statusColors = {
                    open: 'bg-rose-600 text-white',
                    'in-progress': 'bg-indigo-600 text-white',
                    resolved: 'bg-emerald-600 text-white',
                    closed: 'bg-slate-600 text-white'
                  };

                  return (
                    <div
                      key={req.id}
                      onClick={() => setSelectedTicket(req)}
                      className={`p-3 border-2 border-slate-900 rounded-none cursor-pointer transition-all shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] ${
                        selectedTicket?.id === req.id ? 'bg-slate-150 border-indigo-600 ring-2 ring-indigo-600' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[9px] font-bold text-slate-400">{req.id}</span>
                        <div className="flex gap-1">
                          <span className={`px-1.5 py-[1px] border text-[8px] font-black uppercase rounded-none ${priorityColors[req.priority]}`}>
                            {req.priority}
                          </span>
                          <span className={`px-1.5 py-[1px] text-[8px] font-black uppercase rounded-none ${statusColors[req.status]}`}>
                            {req.status}
                          </span>
                        </div>
                      </div>
                      <p className="font-black text-slate-900 uppercase font-display truncate">{req.subject}</p>
                      <div className="flex justify-between items-center mt-2 text-[9px] text-slate-500 font-semibold font-mono">
                        <span>{req.userName}</span>
                        <span>{req.date.split(' ')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Ticket detail viewport */}
          <div className="md:col-span-2">
            {!selectedTicket ? (
              <div className="h-full flex items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 text-slate-400 font-mono font-bold text-center">
                Select an active support ticket in the list to review chat logs and send staff replies.
              </div>
            ) : (
              <div className="p-4 bg-white border-2 border-slate-900 rounded-none shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-4">
                
                {/* Header detail */}
                <div className="border-b border-slate-200 pb-3 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex gap-1 items-center font-mono text-slate-400 text-[10px] font-bold mb-1">
                      <span>Ticket Coordinates: <strong>{selectedTicket.id}</strong></span>
                      <span>•</span>
                      <span>Logged: {selectedTicket.date}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 uppercase leading-snug">{selectedTicket.subject}</h3>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 font-mono">Reporter: {selectedTicket.userName} ({selectedTicket.userEmail})</p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleTicketStatusChange(selectedTicket, e.target.value as any)}
                      className="bg-slate-50 border-2 border-slate-900 rounded-none px-2 py-1 font-mono font-black uppercase text-[10px]"
                    >
                      <option value="open">OPEN (NEW)</option>
                      <option value="in-progress">IN-PROGRESS</option>
                      <option value="resolved">RESOLVED</option>
                      <option value="closed">CLOSED</option>
                    </select>

                    <button
                      onClick={() => { deleteSupportRequest(selectedTicket.id); setSelectedTicket(null); }}
                      className="text-[9px] font-black text-rose-600 hover:underline flex items-center gap-1 mt-1 font-mono uppercase"
                    >
                      <Trash className="h-3 w-3" /> Purge Ticket
                    </button>
                  </div>
                </div>

                {/* Ticket description */}
                <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-none">
                  <p className="font-black uppercase text-[9px] text-indigo-800 tracking-wider font-mono">Original Issue Description:</p>
                  <p className="text-slate-700 font-mono text-[11px] mt-1.5 leading-relaxed whitespace-pre-wrap">{selectedTicket.description}</p>
                </div>

                {/* Replies Stream logs */}
                <div className="space-y-3.5 border-t border-slate-100 pt-3">
                  <h4 className="font-black text-slate-900 uppercase font-mono text-[10px] tracking-wider">Responses & Staff Logs ({selectedTicket.replies?.length || 0})</h4>
                  
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {!selectedTicket.replies || selectedTicket.replies.length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic font-mono py-2">No replies logged. Draft and send the first answer below.</p>
                    ) : (
                      selectedTicket.replies.map((rep, idx) => {
                        const isStaff = rep.author.includes('Staff') || rep.author.includes('Admin');
                        return (
                          <div key={idx} className={`p-2.5 rounded-none border leading-relaxed font-mono text-[10px] ${
                            isStaff ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200 ml-4'
                          }`}>
                            <div className="flex justify-between items-center text-[8px] font-black uppercase text-slate-400 mb-1">
                              <span>{rep.author}</span>
                              <span>{rep.date}</span>
                            </div>
                            <p className="text-slate-800 whitespace-pre-wrap">"{rep.message}"</p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Submit reply */}
                <form onSubmit={handlePostTicketReply} className="border-t border-slate-200 pt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Type official administrative message to user's dashboard..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="flex-1 bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase rounded-none tracking-wider flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" /> Submit Log
                    </button>
                  </div>
                </form>

              </div>
            )}
          </div>

        </div>
      )}

      {/* ===================== NEWSLETTER SUBSCRIBERS ===================== */}
      {activeSubTab === 'newsletter' && (
        <div className="max-w-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <h4 className="font-black text-slate-900 uppercase font-mono tracking-widest">Active Subscription Coordinates ({newsletterSubscribers.length})</h4>
            <button
              onClick={() => {
                const csv = 'Email,SubscribedAt\n' + newsletterSubscribers.map(s => `"${s.email}","${s.subscribedAt}"`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'newsletter-subscribers.csv';
                a.click();
              }}
              className="py-1 px-3 bg-emerald-600 hover:bg-emerald-500 border border-slate-900 rounded-none text-[10px] text-white font-black uppercase tracking-wider cursor-pointer"
            >
              Export CSV Coordinates
            </button>
          </div>

          {newsletterSubscribers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-mono font-bold border-2 border-dashed border-slate-200">
              No newsletter subscribers recorded in session storage.
            </div>
          ) : (
            <div className="bg-white border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
              <table className="w-full text-left font-mono text-[10px]">
                <thead>
                  <tr className="bg-slate-900 text-white uppercase font-black tracking-widest text-[8px] border-b-2 border-slate-900">
                    <th className="p-3">Coordinate Email</th>
                    <th className="p-3">Subscribed Date</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-semibold">
                  {newsletterSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono text-slate-900 text-xs font-bold">{sub.email}</td>
                      <td className="p-3 text-slate-500">{sub.subscribedAt}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteNewsletterSubscriber(sub.id)}
                          className="text-rose-600 hover:text-rose-800 uppercase text-[9px] font-black tracking-wider cursor-pointer"
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
