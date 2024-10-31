import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";


import MainLayout from './Layouts/MainLayout';
import ContextProvider from './Context/ContextProvider';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import HomePage from './Pages/HomePage/HomePage';
import UserProfile from './Pages/UserProfile/UserProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/profile/:userEmail",
        element: <ProtectedRoute><UserProfile></UserProfile></ProtectedRoute>
      },
      {
        path: "/attendanceSheet",
        element: <ProtectedRoute><AttendanceSheet></AttendanceSheet></ProtectedRoute>
      },
      {
        path: "/englishAdda",
        element: <ProtectedRoute><EnglishAdda></EnglishAdda></ProtectedRoute>
      },
      {
        path: "/englishAdd/group/:groupNo",
        element: <ProtectedRoute><Group></Group></ProtectedRoute>
      },
      // {
      //   path: "/dashboard",
      //   element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>
      // },
    ]
  },
  {
    path: "dashboard",
    element: <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute> ,
    children: [
      {
        path: "sessionInfo",
        element: <ProtectedRoute><SessionInfo></SessionInfo></ProtectedRoute>
      },
      {
        path: "lastSevenSession",
        element: <ProtectedRoute><LastSevenDays></LastSevenDays></ProtectedRoute>
      },
      
    ]
  }
]);

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AttendanceSheet from "./Pages/HomePage/AttendanceSheet";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardLayout from "./Layouts/DashboardLayout";
import SessionInfo from "./Pages/Dashboard/SessionInfo";
import LastSevenDays from "./Pages/Dashboard/LastSevenDays";
import { ToastContainer } from "react-toastify";
import EnglishAdda from "./Pages/EnglishAdda.jsx/EnglishAdda";
import Group from "./Pages/Group/Group";

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
