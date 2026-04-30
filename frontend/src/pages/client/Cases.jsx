import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const STATUS_STEPS = ['Created', 'Consultation', 'Filed', 'Hearing', 'Closed'];

const ClientCases = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/cases/client').then(({ data }) => setCases(data)).catch(console.error).finally(() => setLoading(false));
    }, []);

    const getStatusIndex = (status) => STATUS_STEPS.indexOf(status);

    return (
        <div className="flex-1 bg-white dark:bg-[#111821] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-3">
                            <span className="material-symbols-outlined text-sm">folder_shared</span>
                            Case Management
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                            Legal <span className="text-primary italic">Portfolio.</span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-4">Monitor and manage all your active legal proceedings in one place.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="px-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Cases</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{cases.length}</p>
                        </div>
                        <button onClick={() => navigate(-1)} className="size-14 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Portfolio...</p>
                    </div>
                )}

                {!loading && cases.length === 0 && (
                    <div className="py-24 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-xl mb-8">
                            <span className="material-symbols-outlined text-5xl text-slate-300">folder_open</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Active Records</h3>
                        <p className="text-slate-500 font-medium mb-8 max-w-xs text-center">Your legal portfolio is currently empty. Start by finding a verified lawyer for a consultation.</p>
                        <button onClick={() => navigate('/')} className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 transition-all hover:scale-105">
                            Find an Expert Lawyer
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((c) => {
                        const stepIdx = getStatusIndex(c.status);
                        const isClosed = c.status === 'Closed';
                        return (
                            <div key={c._id} className="group relative flex flex-col rounded-[2.5rem] bg-white dark:bg-[#1a2232] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all overflow-hidden">
                                <div className={`h-2 ${isClosed ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${((stepIdx + 1) / STATUS_STEPS.length) * 100}%` }} />
                                
                                <div className="p-8 md:p-10">
                                    <div className="flex items-start justify-between gap-6 mb-8">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isClosed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-primary/10 text-primary'}`}>
                                                    {c.status}
                                                </span>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{c.caseType}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{c.title || c.caseType}</h3>
                                            <p className="text-slate-500 font-medium mt-1">Lawyer: <span className="text-slate-900 dark:text-white font-bold">{c.lawyerId?.name || 'In Progress'}</span></p>
                                        </div>
                                        <div className="hidden sm:flex size-14 rounded-2xl bg-slate-50 dark:bg-slate-900 items-center justify-center text-slate-400 shrink-0">
                                            <span className="material-symbols-outlined text-3xl">history_edu</span>
                                        </div>
                                    </div>

                                    {/* Premium Timeline */}
                                    <div className="mb-10">
                                        <div className="flex items-center justify-between gap-0">
                                            {STATUS_STEPS.map((step, i) => (
                                                <div key={step} className="flex-1 flex flex-col items-center">
                                                    <div className="w-full flex items-center relative">
                                                        {i > 0 && <div className={`flex-1 h-1 ${i <= stepIdx ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`} />}
                                                        <div className={`size-6 md:size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-[#1a2232] shadow-sm z-10 transition-all ${i <= stepIdx ? 'bg-primary text-white scale-110' : 'bg-slate-100 dark:bg-slate-800 text-transparent'}`}>
                                                            {i < stepIdx ? <span className="material-symbols-outlined text-xs md:text-sm font-bold">check</span> : i === stepIdx ? <div className="size-2 bg-white rounded-full animate-pulse" /> : null}
                                                        </div>
                                                        {i < STATUS_STEPS.length - 1 && <div className={`flex-1 h-1 ${i < stepIdx ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`} />}
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest mt-3 whitespace-nowrap ${i === stepIdx ? (isClosed ? 'text-green-500' : 'text-primary') : 'text-slate-400'}`}>
                                                        {step}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm border-t border-slate-100 dark:border-slate-800 pt-8">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">account_balance</span>
                                            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">{c.courtLevel}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest ${c.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                                {c.paymentStatus || 'Invoice Pending'}
                                            </span>
                                            <button className="size-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center hover:bg-primary transition-colors">
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ClientCases;
