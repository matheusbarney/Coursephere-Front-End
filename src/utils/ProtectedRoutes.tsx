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
    
    if(!canManageCourse(courseId)) return <Navigate to="/denied" />;
}
export const RerouteLessonDenied = () => {
    const { lessonId } = useParams();
    const { canManageLesson } = useAuth();
    
    if(!canManageLesson(lessonId)) return <Navigate to="/denied" />;
}
export const RerouteInstructorDenied = () => {
    const { courseId } = useParams();
    const { isInstructor } = useAuth();
    
    if(!isInstructor(courseId)) return <Navigate to="/denied" />;
}

export default ProtectedRoutes