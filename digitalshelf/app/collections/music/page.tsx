"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const MusicPage = () => {
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAlbums, setUserAlbums] = useState([]);

  // 🔹 Fetch Albums from User's Collection
  const fetchUserAlbums = async () => {
    try {
      const response = await axios.get("/api/collections/get");
      const filteredAlbums = response.data.filter((item: any) => item.type === "Music");
      setUserAlbums(filteredAlbums);
    } catch (error) {
      console.error("❌ Error fetching user albums:", error);
    }
  };

  useEffect(() => {
    fetchUserAlbums();
  }, []);

  // 🔹 Handle Album Search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
  
    setLoading(true);
    try {
      const response = await axios.get(`/api/music/search?q=${query}`);
  
      console.log("API Response:", response.data);
  
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setAlbums(response.data);
      } else {
        setAlbums([]);
      }
    } catch (error) {
      console.error("❌ Error fetching albums:", error);
      setAlbums([]);
    }
    setLoading(false);
  };

  // 🔹 Handle Adding Album to Collection
  const handleAddToCollection = async (album: any) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in. Please log in first.");
        return;
      }

      // ✅ Extract album cover safely
      let coverImage = album.coverImage || "/placeholder.jpg";

      // ✅ Ensure correct format (some URLs may be missing "https:")
      if (!coverImage.startsWith("http")) {
        coverImage = `https:${coverImage}`;
      }

      console.log("Adding album:", album);
      console.log("Extracted cover image:", coverImage);

      const response = await axios.post("/api/collections/add", {
        name: album.name,
        type: "Music",
        coverImage,
        userId,
      });

      if (response.status === 201) {
        alert("✅ Album added successfully!");
        fetchUserAlbums();
      }
    } catch (error) {
      console.error("❌ Error adding album:", error.response?.data || error.message);
      alert("❌ Failed to add album. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen bg-white pt-24">
        <h1 className="text-2xl font-bold text-black mb-8">Search and Add Albums</h1>

        {/* 🔹 Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-lg flex">
          <input
            type="text"
            placeholder="Search albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white rounded-r-md hover:bg-red-700 transition"
          >
            Search
          </button>
        </form>

        {/* 🔹 Display Search Results First */}
        <h2 className="text-2xl font-bold text-black mt-10"></h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4 p-6 w-full max-w-7xl">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : albums.length > 0 ? (
            albums.map((album) => (
              <div key={album.name} className="relative group">
                {/* Album Cover */}
                <img
                  src={album.coverImage.startsWith("http") ? album.coverImage : `https:${album.coverImage}`}
                  alt={album.name}
                  className="w-full aspect-square object-cover rounded-md shadow-md"
                />

                {/* Overlay Title (Visible on Hover) */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold text-center px-2">
                    {album.name}
                  </h2>
                </div>

                {/* Add to Collection Button */}
                <button
                  onClick={() => handleAddToCollection(album)}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-600 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ➕ Add to Collection
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500"></p>
          )}
        </div>

        {/* 🔹 Display User's Collection Below */}
        <div className="w-full max-w-7xl px-6 flex justify-between items-center mt-10">
          <h2 className="text-2xl font-bold text-black">My Albums Collection</h2>
          <span className="text-gray-500 text-sm">{userAlbums.length}</span> {/* Subtle Counter */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4 p-6 w-full max-w-7xl">
          {userAlbums.length > 0 ? (
            userAlbums.map((album) => (
              <div key={album._id} className="relative group">
                {/* Album Cover */}
                <img
                  src={album.coverImage.startsWith("http") ? album.coverImage : `https:${album.coverImage}`}
                  alt={album.name}
                  className="w-full aspect-square object-cover rounded-md shadow-md"
                />

                {/* Overlay Title (Visible on Hover) */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold text-center px-2">{album.name}</h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No albums found in your collection.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicPage;