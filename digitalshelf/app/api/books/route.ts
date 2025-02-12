import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("🔍 Fetching books...");

    // Extract query parameter
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      console.error("❌ Missing query parameter!");
      return NextResponse.json({ message: "Query parameter is missing" }, { status: 400 });
    }

    // Check if API key is loaded
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      console.error("❌ GOOGLE_BOOKS_API_KEY is missing in .env.local");
      return NextResponse.json({ message: "API key missing" }, { status: 500 });
    }

    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    console.log(`🌐 Requesting: ${googleBooksUrl}`);

    const response = await fetch(googleBooksUrl);
    
    if (!response.ok) {
      console.error(`❌ Google Books API Error: ${response.status}`);
      return NextResponse.json({ message: "Failed to fetch books" }, { status: 500 });
    }

    const data = await response.json();
    console.log("✅ API Response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}