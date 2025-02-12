import { NextResponse } from "next/server";
import connectDB from "@/services/db";
import Collection from "@/models/Collection";

export async function GET() {
  await connectDB();

  try {
    const collections = await Collection.find({});
    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.error("Fetch Collections Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}