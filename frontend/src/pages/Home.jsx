import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import Hero3D from '../components/Hero3D';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 min-h-screen">
            {/* 3D Hero Section - Responsive Heights */}
            <div className="relative w-full h-70 xs:h-80 sm:h-100 md:h-125 lg:h-150 overflow-hidden bg-linear-to-br from-[#060e1f] via-[#0b1e40] to-[#101622]">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/40 text-xs sm:text-sm">Loading 3D Scene...</div>}>
                    <Hero3D />
                </Suspense>
                
                {/* Overlay content on top of 3D canvas */}
                <div className="absolute inset-0 flex flex-col justify-center items-start px-4 xs:px-5 sm:px-8 md:px-12 lg:px-20 z-10 bg-linear-to-r from-[#060e1f] via-[#060e1f]/40 to-transparent">
                    <div className="max-w-2xl">
                        <span className="inline-block mb-2 xs:mb-3 sm:mb-4 px-3 xs:px-4 py-1 xs:py-1.5 text-[10px] xs:text-xs sm:text-xs font-bold tracking-widest uppercase bg-blue-600/80 text-white rounded-full w-fit backdrop-blur-sm border border-blue-400/30 animate-fade-in-down">
                            ✦ Verified Legal Experts
                        </span>
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2 xs:mb-3 sm:mb-4 drop-shadow-lg">
                            Trusted Legal Professionals
                        </h2>
                        <p className="text-slate-200 text-xs xs:text-sm sm:text-base md:text-lg font-medium mb-4 xs:mb-6 sm:mb-8 max-w-md leading-relaxed">
                            Find the right lawyer for your case with confidence and ease.
                        </p>
                        <button onClick={() => navigate('/auth')} className="bg-primary hover:bg-primary-dark text-white px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg sm:rounded-2xl text-xs xs:text-sm sm:text-base md:text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-3 xs:px-4 sm:px-6 md:px-8 -mt-6 sm:-mt-8 md:-mt-10 relative z-20 pb-12 sm:pb-16 md:pb-20">
                {/* Search Bar - Responsive */}
                <div className="bg-white dark:bg-[#1a2232] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-2 xs:p-2.5 sm:p-3 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-primary/5">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 px-3 xs:px-4 sm:px-4">
                        <div className="flex items-center gap-2 xs:gap-3 flex-1 h-12 xs:h-13 sm:h-14 w-full">
                            <span className="material-symbols-outlined text-slate-400 text-xl sm:text-2xl shrink-0">search</span>
                            <input className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 text-xs xs:text-sm sm:text-base" placeholder="Search case type or location" type="text" />
                        </div>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                        <button className="w-full sm:w-auto bg-primary text-white px-6 xs:px-8 sm:px-10 h-12 xs:h-13 sm:h-14 rounded-lg sm:rounded-2xl font-bold shadow-lg hover:bg-primary-dark transition-all text-xs xs:text-sm sm:text-base">
                            Search
                        </button>
                    </div>
                </div>

                {/* Practice Areas - Responsive Grid */}
                <div className="py-8 sm:py-10 md:py-12">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-6 sm:mb-8">
                        <div>
                            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Practice Areas</h3>
                            <p className="text-slate-500 text-xs xs:text-sm mt-1">Select a category to find specialized help</p>
                        </div>
                        <a className="text-xs xs:text-sm font-bold text-primary hover:underline underline-offset-4 decoration-2 mt-3 xs:mt-0">View All</a>
                    </div>
                    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                        {[
                            { icon: 'gavel', label: 'Criminal Law', color: 'bg-red-50 text-red-600 dark:bg-red-500/10' },
                            { icon: 'family_star', label: 'Family Law', color: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10' },
                            { icon: 'corporate_fare', label: 'Business Law', color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' },
                            { icon: 'real_estate_agent', label: 'Estate Planning', color: 'bg-green-50 text-green-600 dark:bg-green-500/10' },
                            { icon: 'account_balance', label: 'Civil Rights', color: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10' },
                            { icon: 'work', label: 'Employment', color: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 xs:gap-3 p-3 xs:p-4 sm:p-5 md:p-6 bg-white dark:bg-[#1a2232] rounded-lg xs:rounded-xl sm:rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group" onClick={() => navigate('/auth')}>
                                <div className={`w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-lg xs:rounded-xl sm:rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-symbols-outlined text-xl xs:text-2xl sm:text-3xl">{item.icon}</span>
                                </div>
                                <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 text-center leading-snug">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Promo Banner - Responsive */}
                <div className="py-6 sm:py-8 md:py-10">
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2.5rem] bg-linear-to-br from-[#0b50da] to-[#062c7a] shadow-2xl border border-blue-500/20 p-4 xs:p-6 sm:p-8 md:p-12">
                        <div className="absolute right-0 top-0 w-48 xs:w-64 sm:w-96 h-48 xs:h-64 sm:h-96 rounded-full bg-white/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute left-0 bottom-0 w-32 xs:w-48 sm:w-64 h-32 xs:h-48 sm:h-64 rounded-full bg-blue-400/10 blur-[60px] translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
                            <div>
                                <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3">3 Free Messages</h3>
                                <p className="text-blue-100/80 text-xs xs:text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0">Connect with a top-rated attorney today. No commitment required, start your consultation now.</p>
                            </div>
                            <button onClick={() => navigate('/auth')} className="shrink-0 bg-white text-blue-700 px-6 xs:px-8 sm:px-10 py-3 xs:py-4 sm:py-5 rounded-lg sm:rounded-2xl text-xs xs:text-sm sm:text-base md:text-lg font-black shadow-xl hover:scale-105 transition-transform active:scale-95">
                                Consult Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Top Rated Lawyers - Responsive */}
                <div className="py-8 sm:py-10 md:py-12">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-6 sm:mb-8">
                        <div>
                            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Top Rated Lawyers</h3>
                            <p className="text-slate-500 text-xs xs:text-sm mt-1">Recommended by hundreds of clients</p>
                        </div>
                        <a className="text-xs xs:text-sm font-bold text-primary hover:underline mt-3 xs:mt-0 cursor-pointer" onClick={() => navigate('/auth')}>See All</a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                        {[
                            { name: 'Sarah Jenkins', area: 'Family Law', exp: '12 Yrs', rating: 4.9, reviews: 124, img: 'SJ' },
                            { name: 'Marcus Thompson', area: 'Criminal Law', exp: '18 Yrs', rating: 4.8, reviews: 89, img: 'MT' },
                            { name: 'Elena Rodriguez', area: 'Corporate Law', exp: '10 Yrs', rating: 5.0, reviews: 56, img: 'ER' },
                        ].map((lawyer, idx) => (
                            <div key={idx} onClick={() => navigate('/auth')} className="group flex gap-3 xs:gap-4 sm:gap-5 p-4 xs:p-5 sm:p-6 bg-white dark:bg-[#1a2232] rounded-lg xs:rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all">
                                <div className="w-16 xs:w-18 sm:w-20 h-16 xs:h-18 sm:h-20 rounded-lg xs:rounded-xl sm:rounded-2xl bg-linear-to-br from-blue-400 to-blue-700 shrink-0 flex items-center justify-center text-white font-black text-lg xs:text-xl sm:text-2xl shadow-xl group-hover:scale-105 transition-transform">
                                    {lawyer.img}
                                </div>
                                <div className="flex flex-col flex-1 justify-center min-w-0">
                                    <h4 className="text-base xs:text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">{lawyer.name}</h4>
                                    <p className="text-xs xs:text-sm text-slate-500 dark:text-slate-400 mb-2 truncate">{lawyer.area} • {lawyer.exp} Exp.</p>
                                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 w-fit px-2 xs:px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                                        <span className="material-symbols-outlined text-yellow-500 text-[16px] xs:text-[18px] fill-current shrink-0">star</span>
                                        <span className="text-xs xs:text-sm font-bold text-slate-900 dark:text-white">{lawyer.rating}</span>
                                        <span className="text-[10px] xs:text-xs text-slate-400">({lawyer.reviews})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <Footer />
            </div>
        </div>
    );
};

export default Home;
