import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LawyerDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ active: 0, pendingRequests: 0, earnings: 0 });
    const [lawyerData, setLawyerData] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        // Fetch lawyer profile
        fetch(`${apiUrl}/lawyers/${user?.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.msg !== 'Lawyer not found') setLawyerData(data);
            })
            .catch(console.error);

        // Fetch active cases
        fetch(`${apiUrl}/cases/lawyer/${user?.id}`)
            .then(res => res.json())
            .then(cases => setStats(prev => ({ ...prev, active: cases.length })))
            .catch(console.error);
    }, [user?.id]); // Using user?.id is more stable

    const handleCreateFakeProfile = async () => {
        // Mock profile creation
        alert('Profile would be created here via API');
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 h-full bg-background-light dark:bg-background-dark">
            <header className="sticky top-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-[#243347] px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1uLnfoIO2gRtS47w0AdhTiyfTqKFAkEcsxKYBFwJkBa89ITuteDUwZQnwvhq_gGWX9wOKZVZFiUmTysIFV5TeFuQ7NK-x9KrMIyZFSZbkfmNFMUPeJC55B_VZddyeuX0ZKjQMueHakc5_oL7spUmxEMx-IUMU8JA9oSVuwdJEV2gI4izXW6IJ6DXCCcgqhikthpsiKmh4Zg6_h2jbN-mlYt69CQH9vu3fJLm78jvfJOIdp_WEjsFv8HgzJvccbeFKDRms5e2x1JCj")' }}></div>
                            <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-background-light dark:border-background-dark rounded-full"></span>
                        </div>
                        <div>
                            <h1 className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-tight">Welcome back,</h1>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{user?.name}</h2>
                        </div>
                    </div>
                </div>
            </header>

            {!lawyerData && (
                <div className="px-4 pt-6 pb-2">
                    <button onClick={handleCreateFakeProfile} className="w-full text-xs font-semibold py-2 bg-yellow-100 text-yellow-800 rounded">Mock Create Lawyer Profile mapping</button>
                </div>
            )}

            {lawyerData?.verificationStatus === 'pending' && (
                <div className="px-4 pt-6 pb-2">
                    <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-slate-900 to-slate-800 dark:from-[#1a2432] dark:to-[#1e2d40] border border-slate-200 dark:border-[#243347] shadow-lg">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                        <div className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex gap-4">
                                <div className="shrink-0 size-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">Pending Verification</h3>
                                    <p className="text-slate-300 text-sm mt-1">Admin is reviewing your profile.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-4 py-4 grid grid-cols-2 gap-3 mt-2">
                <div onClick={() => navigate('/lawyer/history')} className="bg-white dark:bg-[#1a2432] p-4 rounded-xl border border-slate-200 dark:border-[#243347] shadow-sm cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                            <span className="material-symbols-outlined text-[20px]">briefcase_meal</span>
                        </div>
                        <span className="text-xs font-medium text-emerald-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> +2
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Cases</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.active}</p>
                </div>

                <div className="bg-white dark:bg-[#1a2432] p-4 rounded-xl border border-slate-200 dark:border-[#243347] shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                            <span className="material-symbols-outlined text-[20px]">payments</span>
                        </div>
                        <span className="text-xs font-medium text-emerald-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Earned</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">${lawyerData?.totalEarnings || 0}</p>
                </div>

                <div className="col-span-2 bg-white dark:bg-[#1a2432] p-4 rounded-xl border border-slate-200 dark:border-[#243347] shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                            <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Requests</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.pendingRequests} New</p>
                        </div>
                    </div>
                    <button className="text-primary text-sm font-semibold hover:underline">View All</button>
                </div>
            </div>

            <div className="px-4 pb-4 mt-2">
                <div className="flex items-center justify-between mb-4 mt-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Requests</h3>
                    <a className="text-sm font-medium text-primary hover:text-primary/80" href="#">See all</a>
                </div>
                <div className="space-y-3">
                    {/* Dummy Request List */}
                    <div className="bg-white dark:bg-[#1a2432] rounded-xl p-4 border border-slate-200 dark:border-[#243347] shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400">No new consultation requests.</p>
                    </div>
                </div>
            </div>

            <div className="px-4 pb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Analytics & Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                    <a className="group flex flex-col p-4 bg-linear-to-br from-blue-50 to-blue-100 dark:from-[#1a2432] dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-[#243347] hover:border-primary/50 transition-all" href="#">
                        <div className="size-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">bar_chart</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Performance Analytics</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">View monthly report</span>
                    </a>
                    <a className="group flex flex-col p-4 bg-linear-to-br from-purple-50 to-purple-100 dark:from-[#1a2432] dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-[#243347] hover:border-purple-500/50 transition-all" href="#">
                        <div className="size-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-purple-500 mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">forum</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Messages</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">3 Unread chats</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LawyerDashboard;
