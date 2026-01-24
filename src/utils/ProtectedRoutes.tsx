import { Outlet, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoutes = () => {
    const { user } = useAuth();
    return user ? < Outlet/ > : < Navigate to="/login"/>
}

export const RerouteLogin = () => {
    const { user } = useAuth();
    return user ? <Navigate to="/" /> : <Outlet />;
}

export const RerouteCourseDenied = () => {
    const { courseId } = useParams();
    const { canManageCourse } = useAuth();
    
    return !canManageCourse(courseId) ? <Navigate to="/denied" /> : <Outlet />;
}
export const RerouteLessonDenied = () => {
    const { lessonId } = useParams();
    const { canManageLesson } = useAuth();
    
    return !canManageLesson(lessonId) ? <Navigate to="/denied" /> : <Outlet />;
}
export const RerouteInstructorDenied = () => {
    const { courseId } = useParams();
    const { isInstructor } = useAuth();
    
    return !isInstructor(courseId) ? <Navigate to="/denied" /> : <Outlet />;
}

export default ProtectedRoutes