import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

const Blog = model("Blog", blogSchema);

export default Blog;
