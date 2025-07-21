import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Fixed Dark Radial Glow Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: "#020617",
          backgroundImage: "radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)",
        }}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 pt-20 md:pt-28">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
