import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './app/pages/dashboard/Dashboard.jsx';
import Login from './app/pages/Login/Login.jsx';
//
import NotFound from './app/pages/NotFound/NotFound.jsx';
//
import CourseDetails from './app/pages/Course/CourseDetails/CourseDetails.jsx';
import CourseEdit from './app/pages/Course/CourseEdit/CourseEdit.jsx';
import LessonDetails from './app/pages/Course/Lessons/LessonDetails/LessonDetails.jsx';
import LessonEdit from './app/pages/Course/Lessons/LessonEdit/LessonEdit.jsx';
//
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  // Dashboard 
  {path: "/", element: <Dashboard />},

  // Login 
  {path: "/login", element: <Login />},

  // Course and Lesson 
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

  // Page Not Found 
  {path: "*", element: <NotFound />},
  
  // Add Access Denied route in the future
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
