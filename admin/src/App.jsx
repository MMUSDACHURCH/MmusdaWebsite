import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth pages
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import VerifyUser from './pages/auth/VerifyUser';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetCode from './pages/auth/ResetCode';
import NewPassword from './pages/auth/NewPassword';
import Departments from './components/departments/Departments';

// Dashboard
import AdminDashboard from './dashboard/AdminDashboard/AdminDashboard';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const router = createBrowserRouter([
    // Public routes
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/auth/verify', element: <VerifyUser /> },
    { path: '/forgot-password', element: <ForgetPassword /> },
    { path: '/reset-code', element: <ResetCode /> },
    { path: '/new-password', element: <NewPassword /> },

    // Protected dashboard routes
    {
      path: '/admin/dashboard/*',
      element: isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />,
      children: [
        { path: '', element: <h2>Welcome to Admin Dashboard</h2> },
        { path: 'departments', element: <Departments /> },
      ],
    },

    // Root redirect
    { path: '/', element: <Navigate to={isLoggedIn ? '/admin/dashboard' : '/login'} /> },

    // Catch-all redirect
    { path: '*', element: <Navigate to="/" /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;