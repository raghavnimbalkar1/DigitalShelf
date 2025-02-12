import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ message: "Query parameter is missing" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY || "AIzaSyCkBIZilpFiKHZgnvbps0s0cyESpCvYG2I";
    if (!apiKey) {
      return NextResponse.json({ message: "Google Books API key is missing" }, { status: 500 });
    }

    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    const response = await fetch(googleBooksUrl);
    if (!response.ok) {
      return NextResponse.json({ message: "Failed to fetch books" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}