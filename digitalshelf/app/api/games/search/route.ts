import { NextResponse } from "next/server";
import axios from "axios";

const CLIENT_ID = process.env.IGDB_CLIENT_ID;
const ACCESS_TOKEN = process.env.IGDB_ACCESS_TOKEN;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ message: "Missing search query" }, { status: 400 });
  }

  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `search "${query}"; fields id, name, cover.url, genres.name, platforms.name; limit 10;`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching games:", error.response?.data || error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}