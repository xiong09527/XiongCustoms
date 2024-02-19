const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Message", MessageSchema);
