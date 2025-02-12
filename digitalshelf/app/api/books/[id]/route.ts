import { NextResponse } from "next/server";
import googleBooks from "@/services/googleBooks";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const response = await googleBooks.get(`/volumes/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching book details:", error);
    return NextResponse.json({ error: "Failed to fetch book details" }, { status: 500 });
  }
}