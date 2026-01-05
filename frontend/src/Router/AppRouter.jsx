import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../features/dashboard/Dashboard";
import AssetPage from "../features/asset/AssetPage";
import Assignment from "../features/assignment/Assignment";
import ManageUser from "../features/manage_user/ManageUser";
import Login from "../features/login/Login";
import AssetLayout from "../features/asset/AssetLayout";
import AssetInfoPage from "../features/asset/AssetInfoPage";

export const router = createBrowserRouter([
  {
    path: "/sign_in",
    element: <Login />,
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
        element: <Dashboard />,
        handle: { breadcrumb: "Dashboard" },
      },
      {
        path: "asset",
        element: <AssetLayout />,
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
              // Replace with your actual API endpoint
              try {
                const response = await fetch(`/api/assets/${params.assetId}`);
                const asset = await response.json();
                return { assetName: asset.name };
              } catch (error) {
                console.error("Failed to load asset:", error);
                return { assetName: params.assetId }; // Fallback to ID
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
        path: "manage-user",
        element: <ManageUser />,
        handle: { breadcrumb: "Manage User" },
      },
    ],
  },
]);
