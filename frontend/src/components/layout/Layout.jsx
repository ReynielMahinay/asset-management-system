import Sidebard from "./Sidebard";
import NavBar from "./NavBar";
import Breadcrumbs from "../common/Breadcrumbs";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebard />
      <section className="w-full flex flex-col h-full">
        <NavBar />
        <div className="flex-1 p-4 w-full overflow-y-auto transition-all duration-700 ease-out">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
export default Layout;
