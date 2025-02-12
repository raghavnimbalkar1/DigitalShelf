import { NextResponse } from "next/server";
import dbConnect from "@/services/db";
import Collection from "@/models/Collection";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, coverImage, userId } = body;

    // 🔹 Validate required fields
    if (!name || !type || !coverImage || !userId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // 🔹 Add album to collection
    const newItem = new Collection({ user: userId, name, type, coverImage });
    await newItem.save();

    return NextResponse.json({ message: "Added successfully", item: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error adding to collection:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}