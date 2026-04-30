import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';


const LawyerHistory = () => {
    const { user } = useAuth();
    const [cases, setCases] = useState([]);
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

        fetch(`${apiUrl}/cases/lawyer/${user?.id}`)
            .then(res => res.json())
            .then(data => setCases(data))
            .catch(console.error);
    }, [user?.id]); // Using user?.id is more stable


    return (
        <div className="flex-1 overflow-y-auto pb-24 h-full bg-background-light dark:bg-background-dark">
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2430] border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Case History</h1>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors relative">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
            </header>

            <section className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Performance Metrics</h2>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">All Time</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#1a2430] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-32">
                        <div className="flex items-start justify-between">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                <span className="material-symbols-outlined text-xl">trophy</span>
                            </div>
                            <span className="flex items-center text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> +5.2%
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Win Rate</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">82%</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1a2430] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-32">
                        <div className="flex items-start justify-between">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <span className="material-symbols-outlined text-xl">gavel</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Cases Total</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{cases.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1a2430] p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 mt-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">${lawyerData?.totalEarnings || 0}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Cases</h2>
                <div className="space-y-3">
                    {cases.map((c) => (
                        <div key={c._id} className="bg-white dark:bg-[#1a2430] p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-sm">C</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{c.title}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{c.caseType}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.status === 'Closed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {c.status}
                                </span>
                            </div>
                            <div className="h-px bg-slate-100 dark:bg-slate-700 w-full"></div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex flex-col">
                                    <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wide">Client</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-200">{c.clientId?.name}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wide">Date</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{new Date(c.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {cases.length === 0 && <p className="text-sm text-slate-500">No cases found.</p>}
                </div>
            </section>
        </div>
    );
};

export default LawyerHistory;
