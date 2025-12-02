import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../features/dashboard/Dashboard";
import AssetPage from "../features/asset/AssetPage";
import Assignment from "../features/assignment/Assignment";
import ManageUser from "../features/manage_user/ManageUser";
import Login from "../features/login/Login";

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
        path: "dashboard",
        element: <Dashboard />,
        handle: { breadcrumb: "Dashboard" },
      },
      {
        path: "asset",
        element: <AssetPage />,
        handle: { breadcrumb: "Asset" },
      },
      {
        path: "assignment",
        element: <Assignment />,
        handle: { breadcrumb: "Assignment" },
      },
      {
        path: "manage-user",
        element: <ManageUser />,
        handle: { breadcrumb: "Manage User" },
      },
    ],
  },
]);
