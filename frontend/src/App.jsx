import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../../frontend/src/pages/LandingPage";
import { Toaster } from "sonner";
import "./App.css"; 
import Sermons from "../../frontend/src/components/sermons/Sermons";
import Error from "./components/Error/Error";
import PrayerRequest from "../../frontend/src/components/prayerRequest/PrayerRequest";
import ContactPage from "./pages/ContactPage";
import Beliefs from "./components/beliefs/Beliefs";
import AboutMmusda from "./components/aboutmmusda/AboutMmusda";
import Announcements from "./components/announcements/Announcements";
import Events from "./components/events/Events";
import AboutSDA from "./components/aboutsda/AboutSDA";
import Books from "./components/book/Book";
import Departments from "./components/departments/Departments";
import Leaders from "./components/leaders/Leaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />, 
    },
    {
      path: "/sermons",
      element: <Sermons />,
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      path: "/prayers",
      element: <PrayerRequest />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/about/beliefs",
      element: <Beliefs />,
    },
    {
      path: "/about/mmusda",
      element: <AboutMmusda />,
    },
    {
      path: "/announcements",
      element: <Announcements />,
    },
    {
      path: "/events",
      element: <Events />,
    },
    {
      path: "/about/sda",
      element: <AboutSDA />,
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/departments",
      element: <Departments />,
    },
    {
      path: "/leadership",
      element: <Leaders />,
    },
    
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "error-toast",
            success: "success-toast",
            info: "info-toast",
          },
        }}
      />
    </>
  );
}

export default App;
