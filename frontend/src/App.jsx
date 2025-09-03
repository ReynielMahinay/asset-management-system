import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebard from "./components/layout/Sidebard";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Dashboard from "./features/dashboard/Dashboard";
import AssetPage from "./features/asset/AssetPage";
import ManageUser from "./features/manage_user/ManageUser";
import Assignment from "./features/assignment/Assignment";
function App() {
  const [isActivePage, setActivePage] = useState("dashboard");
  const [assetTotal, setAssetTotal] = useState(0);

  const renderPageContent = () => {
    switch (isActivePage) {
      case "dashboard":
        return <Dashboard assetTotal={assetTotal} />;
      case "asset":
        return (
          <AssetPage setAssetTotal={setAssetTotal} assetTotal={assetTotal} />
        );
      case "manage_user":
        return <ManageUser />;
      case "assignment":
        return <Assignment />;
    }
  };

  React.useEffect(() => {
    console.log("assetTotal updated:", assetTotal);
  }, [assetTotal]);
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebard setActivePage={setActivePage} isActivePage={isActivePage} />

      <section className="w-full flex flex-col">
        <NavBar isActivePage={isActivePage} />
        <div
          className={`transition-all duration-700 ease-out p-4 ${
            isActivePage ? "opacity-100 translate-0" : "opacity-0 translate-y-5"
          }`}
        >
          {renderPageContent()}
        </div>
        {/* <Footer /> */}
      </section>
    </div>
  );
}

export default App;
