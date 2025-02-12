import axios from "axios";

const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const LASTFM_BASE_URL = "https://ws.audioscrobbler.com/2.0/";

const lastfm = axios.create({
  baseURL: LASTFM_BASE_URL,
  params: {
    api_key: LASTFM_API_KEY,
    format: "json",
  },
});

// 🔹 Function to search albums by name
export const searchAlbums = async (albumName: string) => {
  try {
    const response = await lastfm.get("", {
      params: {
        method: "album.search",
        album: albumName,
      },
    });

    return response.data.results.albummatches.album.map((album: any) => ({
      name: album.name,
      artist: album.artist,
      coverImage: album.image.find((img: any) => img.size === "extralarge")?.["#text"] || "/placeholder.jpg",
      url: album.url,
    }));
  } catch (error) {
    console.error("Error fetching albums from Last.fm:", error);
    return [];
  }
};

export default lastfm;