import Sidebard from "./Sidebard";
import NavBar from "./NavBar";
import Breadcrumbs from "../common/Breadcrumbs";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-row h-screen">
      <Sidebard />
      <section className="w-full flex flex-col">
        <NavBar />
        <div className="transition-all duration-700 ease-out p-4 w-full h-full overflow-y-auto">
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default Layout;
