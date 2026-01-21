import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/auth';

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);
    return user ? < Outlet/ > : < Outlet/ >
}

export const RerouteLogin = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return user ? < Outlet/ > : <Outlet />;
}

export default ProtectedRoutes