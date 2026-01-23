import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/auth';

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);
    return user ? < Outlet/ > : < Navigate to="/login"/>
}

export const RerouteLogin = () => {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/" /> : <Outlet />;
}

export default ProtectedRoutes