import mongoose, { Schema, Document } from "mongoose";

export interface ICollection extends Document {
  user?: mongoose.Schema.Types.ObjectId; // Made optional
  name: string;
  type: "Book" | "DVD" | "CD" | "Game" | "Music";
  coverImage: string;
}

const CollectionSchema = new Schema<ICollection>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Book", "DVD", "CD", "Game", "Music"], required: true }, // ✅ Added "Music"
    coverImage: { type: String },
  });


const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;