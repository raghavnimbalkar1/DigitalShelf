import { NextRequest } from "next/server";
import User from "@/models/User";
import connectDB from "@/services/db";
import { cookies } from "next/headers";

export async function getUserFromRequest(req: NextRequest) {
  await connectDB();
  
  try {
    const sessionUser = cookies().get("userId"); // Get user ID from cookies
    if (!sessionUser) return null;

    // Fetch user from DB
    const user = await User.findById(sessionUser.value).select("_id email");

    return user || null;
  } catch (error) {
    console.error("Session Authentication Error:", error);
    return null;
  }
}