import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../features/dashboard/Dashboard";
import AssetPage from "../features/asset/AssetPage";
import Assignment from "../features/assignment/Assignment";
import ManageEmployee from "../features/manage_employee/ManageEmployee";
import Login from "../features/login/Login";
import AssetLayout from "../features/asset/AssetLayout";
import AssetInfoPage from "../features/asset/AssetInfoPage";
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
            path: ":assetId",
            element: <AssetInfoPage />,
            handle: {
              breadcrumb: (data) => data?.assetName || "Loading...",
            },
            loader: async ({ params }) => {
              try {
                const response = await fetch(`/api/assets/${params.assetId}`);
                const asset = await response.json();
                return { assetName: asset.name };
              } catch (error) {
                console.error("Failed to load asset:", error);
                return { assetName: params.assetId };
              }
            },
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
          <ProtectedRoute adminOnly={true}>
            <ManageEmployee />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Manage Employee" },
      },
    ],
  },
]);
