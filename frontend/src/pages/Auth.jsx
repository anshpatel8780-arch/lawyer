import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Auth = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('client');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpStep, setOtpStep] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!isLogin && !formData.email.toLowerCase().endsWith('@gmail.com')) {
            setError('Only official @gmail.com accounts are permitted to register.');
            setLoading(false);
            return;
        }

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin ? { email: formData.email, password: formData.password } : { ...formData, role };
            const { data } = await API.post(endpoint, payload);
            
            if (isLogin && data.msg.includes('OTP')) {
                setOtpStep(true);
            } else {
                login(data.token, data.user);
                const dest = data.user.role === 'admin' ? '/admin' : data.user.role === 'lawyer' ? '/lawyer/dashboard' : '/client/dashboard';
                navigate(dest);
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await API.post('/auth/verify-otp', { email: formData.email, otp });
            login(data.token, data.user);
            const dest = data.user.role === 'admin' ? '/admin' : data.user.role === 'lawyer' ? '/lawyer/dashboard' : '/client/dashboard';
            navigate(dest);
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            await API.post('/auth/resend-otp', { email: formData.email });
            alert('OTP Resent to your email.');
        } catch {
            setError('Could not resend OTP');
        }
    };

    return (
        <div className="flex-1 min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-white dark:bg-[#111821]">
            {/* Left Side: Background & Branding (Desktop only) */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#060e1f]">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80" 
                         className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Legal Background" />
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-background-dark/80 z-10"></div>
                
                <div className="relative z-20 flex flex-col justify-center p-20 text-white">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-8 border border-white/20">
                        <span className="material-symbols-outlined text-4xl">balance</span>
                    </div>
                    <h2 className="text-5xl font-black mb-6 leading-tight">
                        Securing Your Legal <br />
                        <span className="text-primary">Future Today.</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-md font-medium leading-relaxed">
                        Connect with verified legal professionals and manage your cases with confidence on India's most trusted legal platform.
                    </p>
                    
                    <div className="mt-12 flex gap-8">
                        <div>
                            <p className="text-3xl font-black text-white">10k+</p>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Verified Lawyers</p>
                        </div>
                        <div className="h-10 w-px bg-white/10"></div>
                        <div>
                            <p className="text-3xl font-black text-white">4.9/5</p>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Client Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    {/* Brand for mobile */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-3xl">balance</span>
                        </div>
                    </div>

                    <div className="text-center md:text-left mb-8">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                            {isLogin ? 'Welcome Back' : 'Get Started'}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            {isLogin ? 'Sign in to access your legal dashboard' : 'Create an account to find the best legal help'}
                        </p>
                    </div>

                    {!isLogin && (
                        <div className="mb-6">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 block">I am a</label>
                            <div className="flex w-full rounded-2xl bg-slate-100 dark:bg-slate-800/50 p-1.5 border border-slate-200 dark:border-slate-800">
                                {['client', 'lawyer', 'admin'].map((r) => (
                                    <button key={r} onClick={() => setRole(r)}
                                        className={`flex-1 rounded-xl py-2.5 text-sm font-bold capitalize transition-all duration-300 ${role === r ? 'bg-white dark:bg-slate-700 shadow-xl text-primary scale-100' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3 animate-shake">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    {otpStep ? (
                        <form className="space-y-6" onSubmit={handleOTPVerify}>
                            <div className="text-center mb-6">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    We've sent a 6-digit code to <span className="font-bold text-slate-900 dark:text-white">{formData.email}</span>
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Verification Code</label>
                                <input 
                                    className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 px-4 text-center text-3xl font-black tracking-[1em] text-primary placeholder:text-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                    placeholder="000000" 
                                    type="text" 
                                    maxLength="6"
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full rounded-2xl bg-primary hover:bg-primary-dark py-4 text-base font-black text-white shadow-xl shadow-primary/25 disabled:opacity-60 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                                {loading ? (
                                    <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Verifying...</>
                                ) : (
                                    <>Verify OTP <span className="material-symbols-outlined">verified</span></>
                                )}
                            </button>
                            <button type="button" onClick={handleResendOTP} className="w-full text-sm font-black text-primary uppercase tracking-widest hover:underline">
                                Resend Code
                            </button>
                            <button type="button" onClick={() => setOtpStep(false)} className="w-full text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Back to Login
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="space-y-1.5 group">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors group-focus-within:text-primary">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined">person</span>
                                        </div>
                                        <input className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                            placeholder="Enter your name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required={!isLogin} />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <input className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                        placeholder="name@example.com" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                                    {isLogin && <button type="button" className="text-xs font-black text-primary hover:text-primary-dark uppercase tracking-widest">Forgot Password?</button>}
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined">lock</span>
                                    </div>
                                    <input className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                        placeholder="••••••••" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full rounded-2xl bg-primary hover:bg-primary-dark py-4 text-base font-black text-white shadow-xl shadow-primary/25 disabled:opacity-60 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                                {loading ? (
                                    <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Processing...</>
                                ) : (
                                    <>{isLogin ? 'Sign In' : 'Create Account'} <span className="material-symbols-outlined">arrow_forward</span></>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {isLogin ? "Don't have an account?" : "Already member of LawConnect?"}
                            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="ml-2 font-black text-primary hover:text-primary-dark transition-colors">
                                {isLogin ? "Join Now" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
