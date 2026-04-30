import { useEffect, useState } from 'react';
import API from '../../api/axios';
import Footer from '../../components/Footer';

const AdminPanel = () => {
    const [pendingLawyers, setPendingLawyers] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        API.get('/admin/lawyers').then(({ data }) => {
            setPendingLawyers(data.filter(l => l.verificationStatus === 'pending'));
        }).catch(() => { });
        API.get('/admin/stats').then(({ data }) => setStats(data)).catch(() => { });
    }, []);

    const handleVerification = async (id, action) => {
        try {
            await API.put(`/admin/lawyer/${id}/${action}`);
            setPendingLawyers(prev => prev.filter(l => l._id !== id));
        } catch (err) {
            console.error('Verification failed', err);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto pb-8 h-full bg-background-light dark:bg-[#0f1621] text-slate-900 dark:text-slate-100">
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#1a2232]/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <h1 className="text-lg font-bold text-[#1754cf] dark:text-white">LawConnect <span className="text-xs font-normal opacity-50">Admin</span></h1>
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#1754cf] to-blue-400 flex items-center justify-center text-white text-xs font-black">AD</div>
            </header>

            <div className="px-4 py-6">
                <h2 className="text-2xl font-black mb-1">Dashboard Overview</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Welcome back, Administrator.</p>
            </div>

            {/* Stats */}
            <div className="px-4 grid grid-cols-2 gap-3 mb-6">
                {[
                    { label: 'Total Clients', value: stats.totalUsers || 0, icon: 'group', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' },
                    { label: 'Total Lawyers', value: stats.totalLawyers || 0, icon: 'gavel', color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600' },
                    { label: 'Pending Reviews', value: stats.pendingVerifications || 0, icon: 'pending_actions', color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' },
                    { label: 'Premium Users', value: stats.premiumUsers || 0, icon: 'workspace_premium', color: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600' },
                ].map((s) => (
                    <div key={s.label} className="bg-white dark:bg-[#1a2232] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                            <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{s.label}</p>
                        <h3 className="text-2xl font-black">{s.value}</h3>
                    </div>
                ))}
            </div>

            {/* Alert */}
            <div className="mx-4 mb-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-900 text-red-500 p-2 rounded-full shrink-0">
                    <span className="material-symbols-outlined text-[18px]">gpp_bad</span>
                </div>
                <div>
                    <h3 className="text-red-600 dark:text-red-400 font-bold text-sm">Fake Document Alert</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">System detected potentially forged certificates. Immediate review required.</p>
                </div>
            </div>

            {/* Verification Queue */}
            <div className="px-4 pb-4">
                <h3 className="text-lg font-bold mb-4">Verification Queue ({pendingLawyers.length})</h3>
                <div className="flex flex-col gap-4">
                    {pendingLawyers.map((lawyer) => (
                        <div key={lawyer._id} className="bg-white dark:bg-[#1a2232] rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="flex gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-700 text-white font-black flex items-center justify-center text-xl shrink-0">
                                    {lawyer.userId?.name?.[0] || 'L'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold truncate">{lawyer.userId?.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{lawyer.userId?.email}</p>
                                    <p className="text-xs text-slate-400">Bar No: {lawyer.barLicenseNumber}</p>
                                </div>
                                <span className="h-6 px-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[10px] font-bold flex items-center">Pending</span>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => handleVerification(lawyer._id, 'reject')} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-red-50 hover:text-red-600 transition-colors">
                                    <span className="material-symbols-outlined text-[16px]">close</span> Reject
                                </button>
                                <button onClick={() => handleVerification(lawyer._id, 'approve')} className="flex-1 bg-[#1754cf] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                                    <span className="material-symbols-outlined text-[16px]">check</span> Approve
                                </button>
                            </div>
                        </div>
                    ))}
                    {pendingLawyers.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <span className="material-symbols-outlined text-4xl mb-2 block">check_circle</span>
                            <p className="text-sm">No pending verifications!</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminPanel;
