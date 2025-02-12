"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const categories = [
  {
    name: "Movies",
    path: "/collections/movies",
    image: "https://external-preview.redd.it/zab4_sUDkMWxNZ4rb6OQgqqia1eY8uPaYuHDAv--JLM.jpg?auto=webp&s=ed1b4b88520b6ecf75bd9e204bf1c54ff016ae4c",
  },
  {
    name: "Music",
    path: "/collections/music",
    image: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
  },
  {
    name: "Games",
    path: "/collections/games",
    image: "https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/4000896/2.0.jpg",
  },
  {
    name: "Books",
    path: "/collections/books",
    image: "https://i.redd.it/gc0xfbzcmdw31.jpg",
  },
];

const CollectionsPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white pt-20">
        <h1 className="text-2xl font-bold text-black mb-8">My Collections</h1>

        {/* Grid Layout for Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 max-w-7xl">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.path}
              className="relative rounded-lg overflow-hidden group transition-transform transform hover:scale-105 shadow-lg"
            >
              {/* Background Image - Portrait (2:3 aspect ratio) */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full aspect-[2/3] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-2xl font-bold">{category.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollectionsPage;