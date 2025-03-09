import { NextResponse } from "next/server";
import googleBooks from "@/services/googleBooks";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    console.log(`📖 Fetching book details for ID: ${params.id}`);

    const response = await googleBooks.get(`/volumes/${params.id}`);

    if (!response.data) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching book details:", error);
    return NextResponse.json({ error: "Failed to fetch book details" }, { status: 500 });
  }
}