import React from 'react';

export default function Footer() {
    return (
        <div className="px-3 sm:px-4 pb-20 sm:pb-24 pt-6 sm:pt-8">
            <div className="bg-white dark:bg-[#1a2232] rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-xs sm:text-sm border-b border-slate-100 dark:border-slate-800 pb-2 sm:pb-3 font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 uppercase tracking-wider">LawConnect Corporate</h3>

                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Phone Support */}
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary shadow-sm shrink-0">
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">call</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Phone Support (24/7)</p>
                            <a href="tel:+18005550199" className="text-xs sm:text-sm font-black text-slate-900 dark:text-white break-all">+1 (800) 555-0199</a>
                        </div>
                    </div>

                    {/* Email Support */}
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary shadow-sm shrink-0">
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">mail</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">General Inquiries</p>
                            <a href="mailto:support@lawconnect.com" className="text-xs sm:text-sm font-black text-slate-900 dark:text-white break-all">support@lawconnect.com</a>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary shadow-sm shrink-0">
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">location_on</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Headquarters</p>
                            <p className="text-[10px] sm:text-xs font-semibold text-slate-900 dark:text-white leading-snug">123 Legal Avenue, Suite 400<br />New York, NY 10001</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-2 sm:px-4 text-center">
                <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-600 leading-relaxed mb-2 font-medium">
                    LawConnect does not provide legal advice. All services are provided by independent licensed lawyers.
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-500 font-bold">
                    &copy; {new Date().getFullYear()} LawConnect Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}
