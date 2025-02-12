import { NextResponse } from "next/server";
import { searchAlbums } from "@/services/lastfm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ message: "Missing query parameter" }, { status: 400 });
    }

    const albums = await searchAlbums(query);
    return NextResponse.json(albums, { status: 200 });
  } catch (error) {
    console.error("Error in Last.fm API route:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}