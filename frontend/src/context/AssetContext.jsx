import React, { createContext, useState, useEffect, useContext } from "react";

// Create the Context
export const AssetContext = createContext();

// Custom hook for easier usage
export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAssets must be used within AssetProvider");
  }
  return context;
};

// Provider Component
export const AssetProvider = ({ children }) => {
  const [assetTotal, setAssetTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assets function
  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:5000/api/assets");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setAssetTotal(Number(data.total) || 0);
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh function that can be called from anywhere
  const refreshAssets = () => {
    fetchAssets();
  };

  // Update asset total manually (for when you add/delete assets)
  const updateAssetTotal = (newTotal) => {
    setAssetTotal(Number(newTotal) || 0);
  };

  // Fetch assets on component mount
  useEffect(() => {
    fetchAssets();
  }, []);

  const value = {
    // State
    assetTotal,
    loading,
    error,

    // Functions
    refreshAssets,
    updateAssetTotal,
    setAssetTotal, // Keep this for backward compatibility
  };

  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};
