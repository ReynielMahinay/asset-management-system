import Sidebard from "./Sidebard";
import NavBar from "./NavBar";
import Breadcrumbs from "../common/Breadcrumbs";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebard />
      <section className="w-full flex flex-col">
        <NavBar />
        <div className="transition-all duration-700 ease-out p-4">
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default Layout;
