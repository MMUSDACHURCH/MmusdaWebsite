import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Auth pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyUser from "./pages/auth/VerifyUser";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetCode from "./pages/auth/ResetCode";
import NewPassword from "./pages/auth/NewPassword";

// Dashboard
import AdminDashboard from "./dashboard/AdminDashboard/AdminDashboard";

// Components
import Departments from "./components/departments/Departments";
import Events from "./components/events/Events";
import Leaders from "./components/leaders/Leaders";
import HomeChurches from "./components/homechurches/HomeChurches";
import Families from "./components/families/Families";
import Announcements from "./components/announcements/Announcements";
import Members from "./components/members/Members";
import Contacts from "./components/contacts/Contacts";
import Suggestions from "./components/suggestions/Suggestions";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/auth/verify",
    element: <VerifyUser />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-code",
    element: <ResetCode />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <h2>Admin Dashboard</h2>,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "leaders",
        element: <Leaders />,
      },
      {
        path: "homechurches",
        element: <HomeChurches />,
      },
      {
        path: "families",
        element: <Families />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "suggestions",
        element: <Suggestions />,
      },
    ],
  },

  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;