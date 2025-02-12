"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";

interface CollectionItem {
  _id: string;
  name: string;
  type: string;
  coverImage: string;
}

const Dashboard = () => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collections/get`);
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <>
      <Navbar currentPage="dashboard" />
      <div className="pt-28 flex flex-col items-center justify-center w-full min-h-screen bg-white">
        <div className="w-full max-w-7xl px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black mt-4">Library</h1>
          <span className="text-gray-500 text-sm mt-4">{collections.length}</span> {/* Subtle Counter */}
        </div>

        {loading ? (
          <p className="text-gray-600 mt-4">Loading collections...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 w-full max-w-7xl">
            {collections.length > 0 ? (
              collections.map((item) => (
                <div 
                  key={item._id} 
                  className="relative bg-gray-100 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
                >
                  {/* Movie Cover */}
                  <img 
                    src={item.coverImage} 
                    alt={item.name} 
                    className="w-full aspect-[2/3] object-cover"
                  />

                  {/* Title (Hidden by Default, Visible on Hover) */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-white text-lg font-bold text-center px-2">{item.name}</h2>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-5 text-center">No collections found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;