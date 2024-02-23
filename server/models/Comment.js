import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
