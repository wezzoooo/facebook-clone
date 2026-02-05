import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import NewsFeed from './pages/NewsFeed/NewsFeed'
import UserProfile from './pages/UserProfile/UserProfile'
import NotFound from './pages/NotFound/NotFound'
import AuthLayout from './Layouts/AuthLayout'
import Register from './pages/Auth/Register/Register'
import Login from './pages/Auth/Login/Login'
import { Button } from '@heroui/react'
import AppProtectedRoutes from './components/ProtectedRoutes/AppProtectedRoutes'
import AuthProtectedRoutes from './components/ProtectedRoutes/AuthProtectedRoutes'


export default function App() {


  const router = createBrowserRouter([
    {
      path: "",
      element: <AppProtectedRoutes><MainLayout /></AppProtectedRoutes>,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <NewsFeed /> },
        { path: "profile", element: <UserProfile /> },
      ],
    },
    {
      path: "",
      element: <AuthProtectedRoutes><AuthLayout /></AuthProtectedRoutes>,
      children: [
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>

      
      <RouterProvider router={router} />

    </>
  )
}
