"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const GamesPage = () => {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userGames, setUserGames] = useState([]); // ✅ Holds games from the collection

  // 🔹 Fetch Games from User's Collection
  const fetchUserGames = async () => {
    try {
      const response = await axios.get("/api/collections/get");
      const filteredGames = response.data.filter((item: any) => item.type === "Game");
      setUserGames(filteredGames);
    } catch (error) {
      console.error("Error fetching user games:", error);
    }
  };

  useEffect(() => {
    fetchUserGames();
  }, []);

  // 🔹 Handle Game Search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/games/search?q=${query}`);
      setGames(response.data || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
    setLoading(false);
  };

  // 🔹 Handle Adding Game to Collection
  const handleAddToCollection = async (game: any) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in. Please log in first.");
        return;
      }

      const response = await axios.post("/api/collections/add", {
        name: game.name,
        type: "Game",
        coverImage: game.cover ? `https:${game.cover.url}` : "/placeholder.jpg",
        userId,
      });

      if (response.status === 201) {
        alert("✅ Game added successfully!");
        fetchUserGames(); // ✅ Refresh collection without page reload
      }
    } catch (error) {
      console.error("❌ Error adding game:", error.response?.data || error.message);
      alert("❌ Failed to add game. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen bg-white pt-24">
        <h1 className="text-2xl font-bold text-black mb-8">Search and Add Games</h1>

        {/* 🔹 Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-lg flex">
          <input
            type="text"
            placeholder="Search games..."
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4 p-6 w-full max-w-7xl">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : games.length > 0 ? (
            games.map((game) => (
              <div key={game.id} className="relative group">
                {/* Game Cover */}
                <img
                  src={game.cover ? `https:${game.cover.url}` : "/placeholder.jpg"}
                  alt={game.name}
                  className="w-full aspect-[2/3] object-cover rounded-md shadow-md"
                />

                {/* Overlay Title (Visible on Hover) */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold text-center px-2">
                    {game.name}
                  </h2>
                </div>

                {/* Add to Collection Button */}
                <button
                  onClick={() => handleAddToCollection(game)}
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
          <h2 className="text-2xl font-bold text-black">My Games Collection</h2>
          <span className="text-gray-500 text-sm">{userGames.length}</span> {/* Subtle Counter */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4 p-6 w-full max-w-7xl">
          {userGames.length > 0 ? (
            userGames.map((game) => (
              <div key={game._id} className="relative group">
                {/* Game Cover */}
                <img
                  src={game.coverImage || "/placeholder.jpg"}
                  alt={game.name}
                  className="w-full aspect-[2/3] object-cover rounded-md shadow-md"
                />

                {/* Overlay Title (Visible on Hover) */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold text-center px-2">{game.name}</h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No games found in your collection.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GamesPage;