"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white px-14 py-8 z-50 flex items-center justify-between">
      {/* Logo - Clickable Link to Dashboard */}
      <Link href="/dashboard" className="text-2xl font-bold text-black md:text-2xl">
        DigitalShelf
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link href="/collections" className="text-black hover:text-red-600 transition">
          My Collections
        </Link>
        <Link href="/profile">
          <FaUserCircle className="text-3xl text-black hover:text-red-600 transition" />
        </Link>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        <button 
          className="text-black text-3xl focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4 md:hidden">
          <Link href="/collections" className="text-black hover:text-red-600 transition" onClick={() => setMenuOpen(false)}>
            My Collections
          </Link>
          <Link href="/profile" className="flex items-center space-x-2 text-black hover:text-red-600 transition" onClick={() => setMenuOpen(false)}>
            <FaUserCircle className="text-2xl" />
            <span>Profile</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;