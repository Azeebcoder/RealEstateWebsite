import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-16 py-4 bg-white text-black shadow-md z-100 mb-5">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl flex items-center md:text-2xl">
        <span className="text-slate-500">Baghpat</span>
        <span className="text-slate-800">Estate</span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6">
        <li className="font-semibold text-gray-700 hover:text-slate-900 transition">
          <Link to="/add-property">Add</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
