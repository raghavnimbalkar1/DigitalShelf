import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/services/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { username, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}