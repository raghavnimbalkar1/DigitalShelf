"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/collections/get/${id}`);
        if (!response.data) throw new Error("Item not found");
        setItem(response.data);

        // 🔹 Fetch additional details based on type
        switch (response.data.type) {
          case "Book":
            await fetchBookDetails(response.data.name);
            break;
          case "Game":
            await fetchGameDetails(response.data.name);
            break;
          case "Movie":
          case "TV Show":
            await fetchMovieDetails(response.data.name);
            break;
          case "Music":
            await fetchMusicDetails(response.data.name);
            break;
          default:
            console.warn("Unknown type:", response.data.type);
        }
      } catch (error) {
        console.error("❌ Error fetching item:", error);
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // ✅ Fetch Book Details
  const fetchBookDetails = async (title) => {
    try {
      const response = await axios.get(`/api/books/${encodeURIComponent(title)}`);
      setDetails(response.data);
    } catch (error) {
      console.error("❌ Error fetching book details:", error);
    }
  };

  // ✅ Fetch Game Details
  const fetchGameDetails = async (title) => {
    try {
      const response = await axios.get(`/api/games/details?q=${encodeURIComponent(title)}`);
      setDetails(response.data);
    } catch (error) {
      console.error("❌ Error fetching game details:", error);
    }
  };

  // ✅ Fetch Movie/TV Show Details
  const fetchMovieDetails = async (title) => {
    try {
      const response = await axios.get(`/api/movies/details?q=${encodeURIComponent(title)}`);
      setDetails(response.data);
    } catch (error) {
      console.error("❌ Error fetching movie details:", error);
    }
  };

  // ✅ Fetch Music Album Details
  const fetchMusicDetails = async (title) => {
    try {
      const response = await axios.get(`/api/music/details?q=${encodeURIComponent(title)}`);
      setDetails(response.data);
    } catch (error) {
      console.error("❌ Error fetching music details:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-600 text-lg">Loading item details...</p>
        </div>
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 text-lg">Item not found.</p>
        </div>
      </>
    );
  }

  const coverImage = item.coverImage || "/placeholder.jpg";

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 pt-28 px-6">
        {/* Main Container */}
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col items-center relative">
          {/* Item Cover */}
          <img
            src={coverImage}
            alt={item.name}
            className="w-full max-w-md h-auto object-contain rounded-md shadow-lg"
          />

          {/* Item Details */}
          <div className="w-full mt-6 text-center">
            <h1 className="text-3xl font-bold text-black">{item.name}</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Type: <span className="font-medium">{item.type}</span>
            </p>

            {/* ✅ Display Additional Details Based on Type */}
            {details && (
              <div className="mt-6 text-left w-full max-w-2xl">
                <p className="text-gray-600"><strong>Description:</strong> {details.volumeInfo?.description || "No description available."}</p>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-8 w-full flex justify-center">
            <Link href="/" className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPage;