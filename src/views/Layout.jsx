import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import DashBoard from "./DashBoard";

export function Layout() {
  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-br from-sage-dark to-emerald-600 flex justify-center">
        <Outlet />
      </section>
    </div>
  );
}
