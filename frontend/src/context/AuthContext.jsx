import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
import { connectSocket, disconnectSocket } from '../socket/socket';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        disconnectSocket();
    };

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const storedUser = JSON.parse(localStorage.getItem('user'));
                    if (storedUser) {
                        setUser(storedUser);
                        connectSocket(storedUser.id);
                    }
                } catch {
                    logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, [token]);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        connectSocket(userData.id);
    };


    const refreshUser = async () => {
        try {
            const { data } = await API.get('/auth/me');
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (err) {
            console.error('Failed to refresh user', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, setUser, refreshUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
