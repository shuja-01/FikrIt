"use client";

import { useEffect, useState } from "react";
import { UserCheck, UserX, Loader2, Users, ShieldCheck, Mail, Calendar, Trash2 } from "lucide-react";

export default function FikrAdmin() {
  const [activeTab, setActiveTab] = useState<'pending' | 'users'>('pending');
  const [pendingGuides, setPendingGuides] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [pendingRes, usersRes] = await Promise.all([
        fetch("/api/admin/pending-guides"),
        fetch("/api/admin/users")
      ]);
      const [pendingData, usersData] = await Promise.all([
        pendingRes.json(),
        usersRes.json()
      ]);
      setPendingGuides(pendingData || []);
      setAllUsers(usersData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAction = async (userId: string, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/admin/guide-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      if (res.ok) fetchDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) fetchDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-brand-gold h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Admin Control</h1>
          <div className="flex bg-white p-1 rounded-xl shadow-inner border border-gray-100">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'pending' ? 'bg-brand-gold text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Pending Guides ({pendingGuides.length})
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'users' ? 'bg-brand-gold text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              System Users ({allUsers.length})
            </button>
          </div>
        </div>

        {activeTab === 'pending' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pendingGuides.map((guide) => (
              <div key={guide.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img src={guide.image || '/avatar.png'} className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-2xl font-bold text-brand-dark">{guide.name}</h3>
                      <p className="text-gray-500">{guide.email}</p>
                    </div>
                  </div>
                  <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-bold border border-amber-100">Pending</span>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                    <p className="font-semibold text-brand-dark">{guide.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Marja-e-Taqleed</p>
                    <p className="font-semibold text-brand-dark">{guide.marjae || 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={() => handleAction(guide.id, "approve")}
                    className="flex-1 bg-brand-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg hover:shadow-brand-gold/10"
                  >
                    <UserCheck size={20} /> Approve Guide
                  </button>
                  <button 
                    onClick={() => handleAction(guide.id, "reject")}
                    className="flex-1 bg-white border-2 border-red-100 text-red-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all"
                  >
                    <UserX size={20} /> Reject Role
                  </button>
                </div>
              </div>
            ))}
            {pendingGuides.length === 0 && (
              <div className="col-span-full h-96 flex flex-center rounded-3xl border-2 border-dashed border-gray-200">
                 <p className="text-gray-400 italic font-medium m-auto">No pending applications at the moment.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Joined</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <img src={user.image || '/avatar.png'} className="w-10 h-10 rounded-xl" />
                           <div>
                             <p className="font-bold text-brand-dark">{user.name}</p>
                             <div className="flex items-center gap-2 text-xs text-gray-400">
                               <Mail size={12} /> {user.email}
                             </div>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2 font-bold text-sm">
                            {user.role === 'DEENI_GUIDE' ? (
                              <span className="flex items-center gap-1.5 text-brand-gold">
                                <ShieldCheck size={14} /> Guide
                                {user.isApproved ? <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100">Verified</span> : null}
                              </span>
                            ) : (
                              <span className="text-gray-500 font-medium capitalize">Standard</span>
                            )}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="text-xs text-gray-400 font-medium flex items-center gap-2">
                           <Calendar size={14} /> {new Date(user.createdAt).toLocaleDateString()}
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <button 
                           onClick={() => handleDeleteUser(user.id)}
                           className="p-2 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                           title="Delete User Account"
                         >
                           <Trash2 size={20} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allUsers.length === 0 && (
                <div className="py-20 text-center text-gray-400 italic">No users found in the system.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
