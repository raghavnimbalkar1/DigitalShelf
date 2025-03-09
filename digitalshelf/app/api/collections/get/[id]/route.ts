import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/services/db";
import Collection from "@/models/Collection";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid collection ID" }, { status: 400 });
    }

    console.log(`📦 Fetching collection details for ID: ${params.id}`);

    const item = await Collection.findById(new mongoose.Types.ObjectId(params.id));
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching collection item:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}