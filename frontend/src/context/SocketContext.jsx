import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
            const newSocket = io(socketUrl);
            
            // Using a functional update can sometimes help with linter/compiler rules
            // or we can just ensure it's not triggering a loop.
            setSocket(newSocket);
            
            return () => {
                newSocket.close();
                setSocket(null);
            };
        }
    }, [user]);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
