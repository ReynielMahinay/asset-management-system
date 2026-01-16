import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../features/dashboard/Dashboard";
import AssetPage from "../features/asset/AssetPage";
import Assignment from "../features/assignment/Assignment";
import ManageEmployee from "../features/manage_employee/ManageEmployee";
import Login from "../features/login/Login";
import Users from "../features/Users/Users";
import AssetLayout from "../features/asset/AssetLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/sign_in",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <div className="text-center mt-20">🚫 Unauthorized Access</div>,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Dashboard" },
      },
      {
        path: "asset",
        element: (
          <ProtectedRoute>
            <AssetLayout />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Asset" },
        children: [
          {
            index: true,
            element: <AssetPage />,
          },
          {
            path: "assignment",
            element: <Assignment />,
            handle: { breadcrumb: "Assignment" },
          },
        ],
      },
      {
        path: "manage-employee",
        element: (
          <ProtectedRoute>
            <ManageEmployee />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Employees" },
      },
      {
        path: "manage-users",
        element: (
          <ProtectedRoute adminOnly={true}>
            <Users />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Users" },
      },
    ],
  },
]);
