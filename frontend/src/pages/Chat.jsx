import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../socket/socket';
import API from '../api/axios';

const Chat = () => {
    const { conversationId } = useParams();
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [freeMessages, setFreeMessages] = useState(user?.freeMessages ?? 3);
    const [limitReached, setLimitReached] = useState(false);
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Load message history
        API.get(`/chat/${conversationId}`).then(({ data }) => setMessages(data)).catch(() => { });

        const socket = getSocket();
        socketRef.current = socket;
        if (!socket.connected) socket.connect();

        socket.emit('join_chat', conversationId);
        socket.emit('user_online', user?.id);

        socket.on('receive_message', (msg) => setMessages((prev) => [...prev, msg]));
        socket.on('update_free_messages', ({ freeMessages: fm }) => {
            setFreeMessages(fm);
            setUser((u) => {
                const newUser = { ...u, freeMessages: fm };
                localStorage.setItem('user', JSON.stringify(newUser));
                return newUser;
            });
        });
        socket.on('free_limit_reached', () => setLimitReached(true));
        socket.on('typing', () => { setTyping(true); setTimeout(() => setTyping(false), 2000); });

        return () => {
            socket.off('receive_message');
            socket.off('update_free_messages');
            socket.off('free_limit_reached');
            socket.off('typing');
        };
    }, [conversationId, setUser, user?.id]); // Added missing dependencies

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        if (user?.role === 'client' && !user?.isPremium && freeMessages <= 0) {
            setLimitReached(true);
            return;
        }
        socketRef.current?.emit('send_message', { conversationId, senderId: user.id, text: newMessage });
        setNewMessage('');
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        socketRef.current?.emit('typing', { conversationId, userId: user?.id });
    };

    const isBlocked = user?.role === 'client' && !user?.isPremium && (freeMessages <= 0 || limitReached);

    // Get a stable current time for fallback to avoid impurity during render
    const [now] = useState(() => Date.now());

    return (
        <div className="w-full h-full flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="flex items-center bg-white dark:bg-slate-900 px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0 shadow-sm z-10">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 mr-2">
                    <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">arrow_back</span>
                </button>
                <div className="flex-1">
                    <h2 className="text-slate-900 dark:text-white font-bold text-base">Active Consultation</h2>
                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> Online
                    </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-700">
                    <span className="material-symbols-outlined text-green-600 text-[14px]">lock</span>
                    <span className="text-green-700 dark:text-green-400 text-[10px] font-bold">Encrypted</span>
                </div>
            </div>

            {/* Free Message Banner */}
            {user?.role === 'client' && !user?.isPremium && (
                <div className={`px-4 py-2 flex items-center justify-between shrink-0 ${freeMessages <= 1 ? 'bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800' : 'bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-900/50'}`}>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-600 text-[16px]">info</span>
                        <p className="text-amber-800 dark:text-amber-300 text-xs font-semibold">{freeMessages} Free Message{freeMessages !== 1 ? 's' : ''} Remaining</p>
                    </div>
                    {freeMessages <= 1 && (
                        <button onClick={() => navigate('/premium')} className="text-xs font-bold text-primary">Upgrade</button>
                    )}
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                <div className="flex justify-center mb-2">
                    <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Today</span>
                </div>

                {messages.map((msg, i) => {
                    const isMe = msg.senderId === user.id || msg.senderId?._id === user.id;
                    const messageTime = msg.createdAt || now;
                    return (
                        <div key={i} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {!isMe && <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">L</div>}
                            <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-sm'}`}>
                                {msg.text}
                                <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                                    {new Date(messageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {typing && (
                    <div className="flex items-center gap-2 justify-start">
                        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">L</div>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-1 items-center">
                            {[0, 0.15, 0.3].map((d, i) => (
                                <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                            ))}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input or Premium Gate */}
            {isBlocked ? (
                <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 pb-8 shrink-0">
                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#1c180d] to-slate-800 p-5 shadow-xl flex items-center gap-4">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#f2b90d]/10 rounded-full blur-2xl" />
                        <div className="flex-1 relative z-10">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-[#f2b90d] text-[18px]">workspace_premium</span>
                                <span className="text-white font-bold text-sm">Free Consultation Limit Reached</span>
                            </div>
                            <p className="text-slate-300 text-xs">Upgrade to Premium for unlimited messaging with lawyers.</p>
                        </div>
                        <button onClick={() => navigate('/premium')} className="relative z-10 bg-[#f2b90d] text-black font-bold text-xs py-2.5 px-4 rounded-xl shadow shrink-0 hover:bg-yellow-400 transition-colors">
                            Upgrade
                        </button>
                    </div>
                </div>
            ) : (

                <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-3 pb-8 shrink-0">
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                        <button className="p-1.5 text-slate-400 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-[22px]">add_circle</span>
                        </button>
                        <input
                            className="flex-1 bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-0 text-[14px] py-1"
                            placeholder="Type a secure message..."
                            value={newMessage}
                            onChange={handleTyping}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} className="p-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors shadow">
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
