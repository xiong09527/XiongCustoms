import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    name: String,
    email: String,
    subject: String,
    text: String,
    seen: {
      type: Boolean,
      default: false,
    },
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

export default Message;
