import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import VerifyUser from './pages/auth/VerifyUser';
import AdminDashboard from './dashboard/AdminDashboard/AdminDashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const router = createBrowserRouter([
    // Auth routes
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/auth/verify', element: <VerifyUser /> },

    // Admin Dashboard routes
    {
      path: '/admin/dashboard/*',
      element: isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />,
      children: [
        { path: 'admins', element: <Register /> },
        { path: 'events', element: <Register /> },
        { path: 'leaders', element: <Register /> },
        { path: 'homechurches', element: <Register /> },
        { path: 'families', element: <Register /> },
        { path: 'announcements', element: <Register /> },
        { path: 'choirs', element: <Register /> },
        { path: 'members', element: <Register /> },
        { path: 'contacts', element: <Register /> },
      ],
    },

    // Root redirect: go to dashboard if logged in, else login
    { path: '/', element: isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Navigate to="/login" /> },

    // Catch-all redirect
    { path: '*', element: <Navigate to="/" /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
        }}
      />
    </>
  );
}

export default App;