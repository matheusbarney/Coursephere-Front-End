import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: "/", element: <App />},
  // {path: "/user", element: <User />},
  // {path: "/user/:userId", element: <UserItem />},
  // {path: "/courses", element: <Course />},
  // {path: "/courses/:courseId", element: <CourseItem />},
  // {path: "/courses/lesson", element: <Lesson />},
  // {path: "/courses/lesson/:lessonId", element: <LessonItem />},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
