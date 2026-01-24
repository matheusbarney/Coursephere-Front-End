import { useContext } from 'react';
import AuthContext from '../contexts/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, Login, Logout, RefreshPermissions } = context;

  // Permission check functions
  const canManageCourse = (courseId: string | number): boolean => {
    if (!user) return false;
    const id = typeof courseId === 'string' ? parseInt(courseId) : courseId;
    return user.courses_owned.includes(id);
  };

  const isInstructor = (courseId: string | number): boolean => {
    if (!user) return false;
    const id = typeof courseId === 'string' ? parseInt(courseId) : courseId;
    return user.courses_instructing.includes(id) || user.courses_owned.includes(id);
  };

  const canManageLesson = (lessonId: string | number): boolean => {
    if (!user) return false;
    const id = typeof lessonId === 'string' ? parseInt(lessonId) : lessonId;
    return user.lessons_created.includes(id);
  };

  const canDeleteLesson = (courseId: string | number, lessonId: string | number): boolean => {
    if (!user) return false;
    // Course owner can delete any lesson, or lesson creator can delete their own
    return canManageCourse(courseId) || canManageLesson(lessonId);
  };

  return {
    user,
    RefreshPermissions,
    Login,
    Logout,
    isAuthenticated: !!user,
    canManageCourse,
    isInstructor,
    canManageLesson,
    canDeleteLesson
  };
};

export default useAuth;