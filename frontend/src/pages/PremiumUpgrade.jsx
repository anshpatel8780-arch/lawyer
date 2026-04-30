import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';


const PremiumUpgrade = () => {
    const navigate = useNavigate();
    const { user, refreshUser } = useAuth();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            const success = searchParams.get('success');
            const sessionId = searchParams.get('session_id');

            if (success && sessionId) {
                setLoading(true);
                try {
                    await API.post('/stripe/confirm', { sessionId });
                    await refreshUser();
                    alert('🎉 Premium activated securely! Welcome to the elite tier.');
                    navigate('/client/dashboard');
                } catch (err) {
                    console.error('Confirmation error', err);
                } finally {
                    setLoading(false);
                }
            }
        };
        checkPaymentStatus();
    }, [searchParams, refreshUser, navigate]);

    const handleSelectPlan = (planType) => {
        setSelectedPlan(planType);
        setShowPaymentModal(true);
    };

    const handleRealPayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await API.post('/stripe/create-checkout-session', { planType: selectedPlan });
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Payment session could not be created.');
            }
        } catch (err) {
            console.error('Payment error', err);
            alert('Stripe service unavailable. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (user?.isPremium) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center bg-background-light dark:bg-background-dark">
                <div className="w-20 h-20 rounded-full bg-[#f4c025]/20 flex items-center justify-center text-[#f4c025]">
                    <span className="material-symbols-outlined text-5xl">workspace_premium</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">You're Premium! 🎉</h2>
                <p className="text-slate-500 dark:text-slate-400">Enjoy unlimited consultations with verified lawyers.</p>
                <button onClick={() => navigate('/client/dashboard')} className="bg-primary text-white px-6 py-3 rounded-xl font-bold">Go to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white dark:bg-[#111821] pb-20">
            {/* Header */}
            <div className="relative overflow-hidden bg-slate-900 border-b border-white/5 pt-12 pb-24 px-6 text-center">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80" 
                         className="w-full h-full object-cover opacity-20" alt="Legal" />
                    <div className="absolute inset-0 bg-linear-to-b from-primary/20 via-slate-900/80 to-slate-900"></div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <button onClick={() => navigate(-1)} className="absolute -top-4 left-0 md:-left-12 size-12 flex items-center justify-center rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-6 animate-bounce">
                        <span className="material-symbols-outlined text-xl">workspace_premium</span>
                        <span className="text-xs font-black uppercase tracking-widest">Premium Membership</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Experience Legal <br />
                        <span className="text-primary italic">Without Boundaries.</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium">
                        Join LawConnect Premium for unlimited expert consultations, priority legal reviews, and 24/7 dedicated support.
                    </p>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* Monthly Plan */}
                    <div className="group relative flex flex-col justify-between rounded-[2.5rem] bg-white dark:bg-[#1a2232] p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 transition-all hover:-translate-y-2">
                        <div className="absolute top-8 right-8 text-primary/10">
                            <span className="material-symbols-outlined text-8xl">event</span>
                        </div>
                        
                        <div>
                            <span className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10 mb-6 inline-block">Standard</span>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Monthly Basic</h3>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-5xl font-black text-slate-900 dark:text-white">$29</span>
                                <span className="text-slate-500 font-bold">/ month</span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {['Full attorney directory access', 'Unlimited consultations', 'Standard document reviews', '8/5 dedicated legal support'].map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
                                        <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-primary text-sm font-bold">check</span>
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={() => handleSelectPlan('monthly')} className="w-full rounded-2xl bg-slate-900 dark:bg-slate-800 py-5 text-white font-black hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xl group-hover:scale-[1.02]">
                            Subscribe Monthly
                        </button>
                    </div>

                    {/* Yearly Plan */}
                    <div className="group relative flex flex-col justify-between rounded-[2.5rem] bg-primary p-8 md:p-10 shadow-2xl shadow-primary/30 border-4 border-yellow-400 transition-all hover:-translate-y-2">
                        <div className="absolute top-0 right-10 -translate-y-1/2 bg-yellow-400 text-black text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">
                            Best Value • Save 20%
                        </div>
                        
                        <div>
                            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest mb-6 inline-block">Elite Preferred</span>
                            <h3 className="text-2xl font-bold text-white mb-2">Annual Professional</h3>
                            <div className="flex items-baseline gap-2 mb-8 text-white">
                                <span className="text-5xl font-black">$348</span>
                                <span className="opacity-80 font-bold">/ year</span>
                            </div>

                            <ul className="space-y-4 mb-10 text-white/90">
                                {['Priority attorney matchmaking', 'Unlimited consultations', 'Priority VIP document reviews', '24/7 VIP legal support chat', '2 Months absolutely FREE'].map((f) => (
                                    <li key={f} className="flex items-center gap-3 font-semibold">
                                        <div className="size-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-white text-sm font-bold">star</span>
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={() => handleSelectPlan('yearly')} className="w-full rounded-2xl bg-white py-5 text-primary font-black hover:bg-slate-50 transition-all shadow-xl shadow-black/10 group-hover:scale-[1.02]">
                            Join as Professional
                        </button>
                    </div>
                </div>

                <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-400 font-medium">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">security</span>
                        <span>Secure SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">credit_score</span>
                        <span>Multi-currency Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">verified</span>
                        <span>30-Day Money Back Guarantee</span>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-fade-in" onClick={() => setShowPaymentModal(false)}></div>
                    
                    <div className="bg-white dark:bg-[#1a2232] w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-huge relative z-10 animate-scale-up border border-slate-100 dark:border-slate-800">
                        <button onClick={() => setShowPaymentModal(false)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Complete Checkout</h3>
                            <p className="text-slate-500 font-medium italic">Your security is our highest priority.</p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 mb-8">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Amount</span>
                                <span className="text-2xl font-black text-primary">
                                    {selectedPlan === 'yearly' ? '$348.00' : '$29.00'}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-400">Secure transaction via Stripe Gateway</p>
                        </div>

                        <form onSubmit={handleRealPayment} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Cardholder Information</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined">credit_card</span>
                                    </div>
                                    <input required type="text" placeholder="4242 4242 4242 4242" className="w-full bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-900 dark:text-white focus:border-primary outline-none transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Expiry</label>
                                    <input required type="text" placeholder="MM/YY" className="w-full bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl py-4 px-4 font-bold text-slate-900 dark:text-white focus:border-primary outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">CVC</label>
                                    <input required type="password" placeholder="•••" className="w-full bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl py-4 px-4 font-bold text-slate-900 dark:text-white focus:border-primary outline-none transition-all" />
                                </div>
                            </div>

                            <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-3">
                                {loading ? (
                                    <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Authorizing...</>
                                ) : (
                                    <>{selectedPlan === 'yearly' ? 'Activate Professional' : 'Activate Basic'} <span className="material-symbols-outlined">verified</span></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PremiumUpgrade;
