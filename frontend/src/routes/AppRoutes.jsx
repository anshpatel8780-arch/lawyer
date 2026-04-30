import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Home from '../pages/Home';
import Auth from '../pages/Auth';
import ClientDashboard from '../pages/client/Dashboard';
import ClientCases from '../pages/client/Cases';
import LawyerDashboard from '../pages/lawyer/Dashboard';
import LawyerProfile from '../pages/lawyer/Profile';
import LawyerHistory from '../pages/lawyer/History';
import AdminPanel from '../pages/admin/Panel';
import PremiumUpgrade from '../pages/PremiumUpgrade';
import Chat from '../pages/Chat';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

    return children;
};

const AppRoutes = () => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />
            <div className="flex-1 pb-safe">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={!user ? <Auth /> : <Navigate to={`/${user.role}/dashboard`} />} />

                    <Route path="/client/dashboard" element={<ProtectedRoute allowedRoles={['client']}><ClientDashboard /></ProtectedRoute>} />
                    <Route path="/client/cases" element={<ProtectedRoute allowedRoles={['client']}><ClientCases /></ProtectedRoute>} />

                    <Route path="/lawyer/dashboard" element={<ProtectedRoute allowedRoles={['lawyer']}><LawyerDashboard /></ProtectedRoute>} />
                    <Route path="/lawyer/history" element={<ProtectedRoute allowedRoles={['lawyer']}><LawyerHistory /></ProtectedRoute>} />
                    <Route path="/lawyer/:id" element={<LawyerProfile />} />

                    <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanel /></ProtectedRoute>} />

                    <Route path="/premium" element={<ProtectedRoute allowedRoles={['client']}><PremiumUpgrade /></ProtectedRoute>} />
                    <Route path="/chat/:conversationId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                </Routes>
            </div>
            {user && user.role !== 'admin' && !location.pathname.includes('/chat') && <BottomNav role={user.role} />}
        </div>
    );
};

export default AppRoutes;
