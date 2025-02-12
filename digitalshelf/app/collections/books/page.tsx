"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const BooksPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userBooks, setUserBooks] = useState([]); // ✅ Holds books from the collection

  // 🔹 Fetch Books from User's Collection
  const fetchUserBooks = async () => {
    try {
      const response = await axios.get("/api/collections/get");
      const filteredBooks = response.data.filter((item: any) => item.type === "Book");
      setUserBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching user books:", error);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  // 🔹 Handle Book Search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/books/popular?q=${query}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  // 🔹 Handle Adding Book to Collection
  const handleAddToCollection = async (book: any) => {
    try {
      const userId = localStorage.getItem("userId"); // ✅ Retrieve stored user ID

      if (!userId) {
        alert("User not logged in. Please log in first.");
        return;
      }

      const response = await axios.post("/api/collections/add", {
        name: book.volumeInfo.title,
        type: "Book",
        coverImage: book.volumeInfo.imageLinks?.thumbnail || "",
        userId, // ✅ Send userId with request
      });

      if (response.status === 201) {
        alert("✅ Book added successfully!");
        fetchUserBooks(); // ✅ Refresh collection without page reload
      }
    } catch (error) {
      console.error("❌ Error adding book:", error.response?.data || error.message);
      alert("❌ Failed to add book. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen bg-white pt-24">
        <h1 className="text-2xl font-bold text-black mb-8">Search and Add Books</h1>

        {/* 🔹 Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-lg flex">
          <input
            type="text"
            placeholder="Search books..."
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
          ) : books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="relative group">
                {/* Book Cover */}
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"}
                  alt={book.volumeInfo.title}
                  className="w-full aspect-[2/3] object-cover rounded-md shadow-md"
                />

                {/* Overlay Title (Visible on Hover) */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold text-center px-2">
                    {book.volumeInfo.title}
                  </h2>
                </div>

                {/* Add to Collection Button */}
                <button
                  onClick={() => handleAddToCollection(book)}
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
          <h2 className="text-2xl font-bold text-black">My Books Collection</h2>
          <span className="text-gray-500 text-sm">{userBooks.length}</span> {/* Subtle Counter */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4 p-6 w-full max-w-7xl">
          {userBooks.length > 0 ? (
            userBooks.map((book) => (
              <div key={book._id} className="relative group">
                {/* Book Cover */}
                <img
                  src={book.coverImage || "/placeholder.jpg"}
                  alt={book.name}
                  className="w-full aspect-[2/3] object-cover rounded-md shadow-md"
                />

                {/* Overlay Title (Visible on Hover) */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-lg font-bold text-center px-2">{book.name}</h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books found in your collection.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BooksPage;