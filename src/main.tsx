import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
// For routing:
import Dashboard from './app/pages/Dashboard/Dashboard';
import Login from './app/pages/Login/Login';
import NotFound from './app/pages/NotFound/NotFound';
import CourseDetails from './app/pages/Course/CourseDetails/CourseDetails';
import CourseEdit from './app/pages/Course/CourseEdit/CourseEdit';
import LessonDetails from './app/pages/Course/Lessons/LessonDetails/LessonDetails';
import LessonEdit from './app/pages/Course/Lessons/LessonEdit/LessonEdit';
import ProtectedRoutes, { RerouteLogin } from './utils/ProtectedRoutes';
//



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
      {path: "/course/:courseId/edit", element: <CourseEdit />},
      {path: "/course/:courseId/lesson/:lessonId", children: [
        { index: true, element: <LessonDetails /> },
        { path: "lesson-details", element: <LessonDetails /> }
      ]},
      {path: "/course/:courseId/lesson/:lessonId/edit", element: <LessonEdit />},
  ]},


  // Page Not Found 
  {path: "*", element: <NotFound />},
  
  // Add Access Denied route in the future
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
