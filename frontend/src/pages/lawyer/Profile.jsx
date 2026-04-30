import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const LawyerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [lawyer, setLawyer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/lawyers/${id}`).then(({ data }) => setLawyer(data)).catch(console.error).finally(() => setLoading(false));
    }, [id]);

    const handleConsult = async () => {
        if (!user) return navigate('/auth');
        try {
            const { data } = await API.post('/chat/start', { lawyerId: id });
            navigate(`/chat/${data._id}`);
        } catch (err) {
            console.error('Start chat failed', err);
        }
    };

    if (loading) return <div className="flex-1 flex items-center justify-center text-slate-400">Loading...</div>;
    if (!lawyer) return <div className="flex-1 flex items-center justify-center text-red-400">Lawyer not found.</div>;

    const status = lawyer.verificationStatus;
    return (
        <div className="flex-1 overflow-y-auto pb-24 h-full bg-background-light dark:bg-background-dark">
            <header className="sticky top-0 z-10 flex items-center gap-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <div onClick={() => navigate(-1)} className="flex size-10 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold">Lawyer Profile</h2>
            </header>

            <div className="flex flex-col items-center gap-4 p-6 pb-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-blue-700 text-white font-black text-3xl flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-800">
                        {lawyer.userId?.name?.[0] || 'L'}
                    </div>
                    {status === 'approved' && (
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-500 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[14px]">verified</span>
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">{lawyer.userId?.name}</h2>
                    <p className="text-primary font-semibold text-sm">{lawyer.specialization?.join(', ')}</p>
                    {status === 'approved' && <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full"><span className="material-symbols-outlined text-[12px]">verified</span>Verified</span>}
                    {status === 'pending' && <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full"><span className="material-symbols-outlined text-[12px]">schedule</span>Pending Review</span>}
                    {status === 'rejected' && <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full"><span className="material-symbols-outlined text-[12px]">cancel</span>Not Verified</span>}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 px-4 mb-4">
                {[{ label: 'Years Exp.', value: lawyer.experienceYears || '—' }, { label: 'Rating', value: lawyer.rating ? `${lawyer.rating}★` : 'New' }, { label: 'Cases', value: '—' }].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1 bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</span>
                        <span className="text-xs text-slate-400 font-medium">{s.label}</span>
                    </div>
                ))}
            </div>

            <div className="px-4 mb-4 bg-white dark:bg-slate-800 rounded-2xl mx-4 p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Bar License</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">{lawyer.barLicenseNumber || 'N/A'}</p>
            </div>

            <div className="fixed bottom-0 max-w-md mx-auto w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4 pb-8">
                <button onClick={handleConsult}
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Start Free Consultation
                </button>
            </div>
        </div>
    );
};

export default LawyerProfile;
