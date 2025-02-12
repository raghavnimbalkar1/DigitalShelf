"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { username, email, password });
      router.push("/login");
    } catch (error) {
      setError("❌ Signup failed. Try again.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;