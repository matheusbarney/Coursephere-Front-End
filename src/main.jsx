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
//
import LessonDetails from './app/pages/Course/Lessons/LessonDetails/LessonDetails.jsx';
import LessonEdit from './app/pages/Course/Lessons/LessonEdit/LessonEdit.jsx';
//
import UserDetails from './app/pages/User/UserDetails/UserDetails.jsx';
import UserEdit from './app/pages/User/UserEdit/UserEdit.jsx';
//
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: "/", element: <Dashboard />},
  {path: "/login", element: <Login />},
  {path: "/course/:courseId", index: true, element: <CourseDetails />},
  {path: "/course/:courseId/edit", element: <CourseEdit />},
  {path: "/course/:courseId/lesson/:lessonId", index: true, element: <LessonDetails />},
  {path: "/course/:courseId/lesson/:lessonId/edit", element: <LessonEdit />},
  {path: "/user/:userId", index: true, element: <UserDetails />},
  {path: "/user/:userId/edit", element: <UserEdit />},
  {path: "*", element: <NotFound />},
  // Add Access Denied route in the future
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
