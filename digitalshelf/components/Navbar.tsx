"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md flex items-center justify-between px-6 py-3 z-50">
      <h1 className="text-white text-lg font-bold">DigiShelf</h1>
      <div className="space-x-4">
        {pathname === "/signup" && (
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </Link>
        )}
        {pathname === "/login" && (
          <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">
            Sign Up
          </Link>
        )}
        {pathname.startsWith("/dashboard") && (
          <>
            <Link href="/collections" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Collection
            </Link>
            <Link href="/profile" className="bg-gray-500 text-white px-4 py-2 rounded">
              Profile
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;