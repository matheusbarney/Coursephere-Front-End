import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
// For routing:
import Dashboard from './app/pages/Dashboard/Dashboard';
import Login from './app/pages/Login/Login';
import NotFound from './app/pages/NotFound/NotFound';
import AccessDenied from './app/pages/AccessDenied/AccessDenied';
import CourseDetails from './app/pages/Course/CourseDetails/CourseDetails';
import CourseManage from './app/pages/Course/CourseManage/CourseManage';
import LessonDetails from './app/pages/Course/Lessons/LessonDetails/LessonDetails';
import LessonManage from './app/pages/Course/Lessons/LessonManage/LessonManage';
import ProtectedRoutes, { RerouteLogin, RerouteCourseDenied, RerouteLessonDenied, RerouteInstructorDenied } from './utils/ProtectedRoutes';
//

 //localStorage.clear();

const router = createBrowserRouter([
  // Login 
  // Reroute if already logged in
  {element: <RerouteLogin />, children: [
      {path: "/login", element: <Login />},
  ]},

  // Protected Routes : CourseSphere Main Pages
  // Dashboard, Course and Lesson pages 
  {element: <ProtectedRoutes />, children: [
      {path: "/", element: <Dashboard />},
      {path: "/course/:courseId", children: [ 
          { index: true, element: <CourseDetails />},
          { path: "course-details", element: <CourseDetails />}
      ]},

      {path: "/course/new", element: <CourseManage />}, // New courses page 
      {element: <RerouteCourseDenied />, children: [
        {path: "/course/:courseId/edit", element: <CourseManage />}, // Same end-page but for existing course editing
      ]},
      {path: "/course/:courseId/lesson/:lessonId", children: [
        { index: true, element: <LessonDetails /> },
        { path: "lesson-details", element: <LessonDetails /> }
      ]},
      {element: <RerouteInstructorDenied />, children: [
        {path: "/course/:courseId/lesson/new", element: <LessonManage />}, // New lessons page 
      ]},
      {element: <RerouteLessonDenied />, children: [
        {path: "/course/:courseId/lesson/:lessonId/edit", element: <LessonManage />}, // Same end-page but for existing page editing
      ]},
  ]},


  // Page Not Found 
  {path: "*", element: <NotFound />},
  
  // Access Denied
  {path: "/denied", element: <AccessDenied />},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
