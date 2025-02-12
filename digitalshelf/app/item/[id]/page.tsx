"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Book {
  volumeInfo: {
    title: string;
    description: string;
    imageLinks?: { thumbnail: string };
    authors?: string[];
    publishedDate?: string;
    averageRating?: number;
  };
}

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-gray">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center py-10 px-6">
        <div className="w-full md:w-[320px] flex-shrink-0">
          <img
            src={book?.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"}
            alt={book?.volumeInfo.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:ml-8 flex-1">
          <h1 className="text-5xl font-bold">{book?.volumeInfo.title}</h1>
          <p className="text-gray-400 text-xl mt-1">
            {book?.volumeInfo.publishedDate} · Written by{" "}
            {book?.volumeInfo.authors?.join(", ")}
          </p>
          <p className="text-gray-300 text-lg mt-4 leading-relaxed">
            {book?.volumeInfo.description}
          </p>
          <p className="mt-4 text-xl text-yellow-400 font-semibold">⭐ {book?.volumeInfo.averageRating || "N/A"}</p>

          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition text-lg">
              Add to Collection
            </button>
            <button className="px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition text-lg">
              Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;