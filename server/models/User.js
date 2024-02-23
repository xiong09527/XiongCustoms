import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  avatar: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: String,
  token: String,
  resetToken: String,
  resetTokenExpires: Date,
});

userSchema.methods.generateResetToken = function () {
  const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
  this.resetToken = resetToken;
  this.resetTokenExpires = Date.now() + 3600000; // 1 hour in milliseconds
  return resetToken;
};

const User = model("User", userSchema);

export default User;
