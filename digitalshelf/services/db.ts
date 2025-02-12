import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB Already Connected");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "DigitalShelfDB",
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error: any) {
    console.error("❌ MongoDB Connection Error:", error.message, error.stack);
  }
};

export default connectDB;