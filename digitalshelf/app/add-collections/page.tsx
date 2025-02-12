"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";

const AddCollection = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Movie",
    coverImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/collections/add`, formData);
      alert("Collection added successfully!");
    } catch (error) {
      console.error("Error adding collection:", error);
      alert("Failed to add collection.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white pt-20">
        <h1 className="text-3xl font-bold text-black mb-6">Add to Collection</h1>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-80">
          <label className="block text-black mb-2">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md mb-4" />

          <label className="block text-black mb-2">Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4">
            <option>Movie</option>
            <option>Music</option>
            <option>Game</option>
            <option>Book</option>
          </select>

          <label className="block text-black mb-2">Cover Image URL:</label>
          <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md mb-4" />

          <button type="submit" className="w-full p-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition">
            Add Collection
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCollection;