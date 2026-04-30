import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const ClientDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ active: 0 });
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        API.get('/lawyers').then(({ data }) => setLawyers(data.slice(0, 3))).catch(() => { });
        API.get('/cases/client').then(({ data }) => setStats({ active: data.length })).catch(() => { });
    }, []);

    return (
        <div className="flex-1 bg-white dark:bg-[#111821] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-3">
                            <span className="material-symbols-outlined text-sm">dashboard</span>
                            Client Portal
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                            Welcome back, <br />
                            <span className="text-primary italic">{user?.name?.split(' ')[0]}</span>
                        </h1>
                        {user?.isPremium && (
                            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-2xl bg-yellow-400 text-black w-fit font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-400/20">
                                <span className="material-symbols-outlined text-xl">workspace_premium</span>
                                Premium Member
                            </div>
                        )}
                    </div>
                    
                    <div className="hidden md:flex items-center gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl shadow-xl">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div>
                            <p className="font-black text-slate-900 dark:text-white leading-none mb-1">{user?.name}</p>
                            <p className="text-sm font-bold text-slate-400">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div onClick={() => navigate('/client/cases')} className="group relative overflow-hidden rounded-[2.5rem] p-8 bg-white dark:bg-[#1a2232] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
                        <div className="absolute top-8 right-8 text-primary/10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-7xl">gavel</span>
                        </div>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Active Cases</p>
                        <h3 className="text-5xl font-black text-slate-900 dark:text-white">{stats.active}</h3>
                        <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm">
                            View All Cases <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-[2.5rem] p-8 bg-white dark:bg-[#1a2232] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all">
                        <div className="absolute top-8 right-8 text-amber-500/10 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-7xl">chat_bubble</span>
                        </div>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Consultations</p>
                        <h3 className="text-5xl font-black text-slate-900 dark:text-white">{user?.freeMessages ?? 3}</h3>
                        <p className="mt-6 text-sm font-bold text-slate-400">Available Messages</p>
                    </div>

                    {!user?.isPremium && (
                        <div onClick={() => navigate('/premium')} className="group relative overflow-hidden rounded-[2.5rem] p-8 bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all cursor-pointer border-4 border-yellow-400/30">
                            <div className="absolute top-8 right-8 text-white/10 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-7xl">workspace_premium</span>
                            </div>
                            <p className="text-sm font-black text-white/60 uppercase tracking-widest mb-2">Subscription</p>
                            <h3 className="text-3xl font-black leading-tight">Go Unlimited</h3>
                            <button className="mt-8 px-6 py-3 rounded-xl bg-white text-primary font-black text-sm shadow-xl hover:scale-105 transition-transform">
                                Upgrade Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Recommended Lawyers section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Expert Legal Partners</h3>
                            <p className="text-slate-500 font-medium">Top-rated lawyers matched for your needs</p>
                        </div>
                        <button className="px-6 py-2.5 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Discover All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lawyers.map((lawyer) => (
                            <div key={lawyer._id} className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white dark:bg-[#1a2232] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-400 to-blue-700 text-white font-black flex items-center justify-center text-2xl shadow-xl">
                                        {lawyer.userId?.name?.[0] || 'L'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl text-slate-900 dark:text-white leading-none mb-2">{lawyer.userId?.name}</h4>
                                        <div className="flex items-center gap-1.5 text-yellow-500">
                                            <span className="material-symbols-outlined text-lg fill-current">star</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{lawyer.rating || '4.9'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                                        <span className="material-symbols-outlined text-primary text-xl">gavel</span>
                                        <span className="text-sm truncate">{lawyer.specialization?.join(', ') || 'General Practice'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                                        <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                                        <span className="text-sm">Mumbai, Maharashtra</span>
                                    </div>
                                </div>

                                <button onClick={() => navigate(`/lawyer/${lawyer.userId?._id}`)}
                                    className="w-full rounded-2xl bg-slate-900 dark:bg-slate-800 py-4 text-white font-black text-sm hover:bg-primary transition-all shadow-xl shadow-black/5 group-hover:scale-[1.02]">
                                    Consult Profile
                                </button>
                            </div>
                        ))}
                        {lawyers.length === 0 && (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                                <p className="text-lg font-bold text-slate-400 text-center">No specialized lawyers found in your area yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
