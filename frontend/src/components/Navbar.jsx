import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    return (
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#111821]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between">
                {/* Logo - Responsive */}
                <div className="flex items-center gap-1 sm:gap-2 cursor-pointer group shrink-0" onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-white text-lg sm:text-2xl">balance</span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white hidden xs:inline">LawConnect</h1>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex items-center gap-6">
                    {['Find a Lawyer', 'Practice Areas', 'Legal Advice', 'About Us'].map((item) => (
                        <a key={item} href="#" className="text-xs sm:text-sm font-bold text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors whitespace-nowrap">
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Notifications - Hidden on small mobile */}
                    <button className="hidden sm:flex items-center justify-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-xl sm:text-2xl">notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border border-white dark:border-[#111821]"></span>
                    </button>
                    
                    <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

                    {user ? (
                        <div className="hidden sm:flex items-center gap-2 md:gap-3">
                            <button onClick={handleLogout} className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-danger flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-lg md:text-xl">logout</span>
                                <span className="hidden md:inline">Logout</span>
                            </button>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs md:text-base text-slate-700 dark:text-slate-300 border-2 border-primary/20">
                                {user.name?.[0] || 'U'}
                            </div>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-1 md:gap-2">
                            <button onClick={() => navigate('/auth')} className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 px-3 md:px-4 py-2 hover:text-primary transition-colors">
                                Sign In
                            </button>
                            <button onClick={() => navigate('/auth')} className="text-xs md:text-sm font-bold bg-primary text-white px-4 md:px-6 py-2 rounded-lg md:rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-105">
                                Join
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="sm:hidden flex items-center justify-center p-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-900 dark:text-white text-2xl">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Responsive Dropdown */}
            {mobileMenuOpen && (
                <div className="sm:hidden border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-[#111821]/95 backdrop-blur-xl">
                    <div className="px-3 py-3 space-y-2">
                        <nav className="flex flex-col gap-2">
                            {['Find a Lawyer', 'Practice Areas', 'Legal Advice', 'About Us'].map((item) => (
                                <a 
                                    key={item} 
                                    href="#" 
                                    className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors block"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                        
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 px-3 py-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-sm text-slate-700 dark:text-slate-300 border-2 border-primary/20">
                                            {user.name?.[0] || 'U'}
                                        </div>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{user.name || 'User'}</span>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-sm font-bold text-danger hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <button 
                                        onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}
                                        className="w-full text-sm font-bold text-slate-700 dark:text-slate-300 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <button 
                                        onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}
                                        className="w-full text-sm font-bold bg-primary text-white px-3 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                                    >
                                        Join Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
