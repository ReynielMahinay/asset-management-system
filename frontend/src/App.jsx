import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebard from "./components/layout/Sidebard";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Dashboard from "./features/dashboard/Dashboard";
import AssetPage from "./features/asset/AssetPage";
import ManageUser from "./features/manage_user/ManageUser";
import Assignment from "./features/assignment/Assignment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TbRuler } from "react-icons/tb";
import AppRouter from "./Router/AppRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global default options for all queries
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      retry: 1,
    },

    mutations: {
      retry: 1,
    },
  },
});

function AppContent() {
  const [isActivePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex flex-row min-h-screen">
      <Sidebard />

      <section className="w-full flex flex-col">
        <NavBar />
        <div className="transition-all duration-700 ease-out p-4">
          <AppRouter />
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
