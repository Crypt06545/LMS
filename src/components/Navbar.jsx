import React, { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Link } from "react-router-dom";
import { GraduationCap, MenuIcon, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center backdrop-blur-2xl justify-between px-6 sm:px-10 md:px-14 lg:px-36 py-4 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <GraduationCap className="w-8 h-8 lg:w-10 lg:h-10" />
        <span className="text-xl lg:text-2xl font-semibold tracking-wide">
          EduFord
        </span>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8 text-gray-300">
        <button className="px-5 py-2 font-medium hover:text-white transition">
          Become Educator
        </button>
        <Link
          to="/my-enrollments"
          className="hover:text-white transition font-medium"
        >
          My Enrollments
        </Link>

        <Button className="bg-transparent border border-gray-600 hover:border-white hover:text-white px-4 py-2 rounded-md transition">
          Create Account
        </Button>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        {isOpen ? (
          <X
            size={28}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <MenuIcon
            size={28}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      {/* Mobile menu */}
    </nav>
  );
};

export default Navbar;
