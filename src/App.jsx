import { useState } from "react";
import "./App.css";
import Sidebard from "./components/layout/Sidebard";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Dashboard from "./features/dashboard/Dashboard";
import AssetPage from "./features/asset/AssetPage";

function App() {
  const [isActivePage, setActivePage] = useState("dashboard");

  const renderPageContent = () => {
    switch (isActivePage) {
      case "dashboard":
        return <Dashboard />;
      case "asset":
        return <AssetPage />;
    }
  };
  return (
    <div className="flex flex-row h-full">
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
