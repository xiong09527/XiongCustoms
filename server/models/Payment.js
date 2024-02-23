import mongoose from "mongoose";

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    paymentId: String,
    userId: String,
    amount: Number,
    status: String,
    paid: Boolean,
    amount_captured: Number,
    city: String,
    country: String,
    line1: String,
    postCode: String,
    name: String,
    email: String,
    receipt_url: String,
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);

export default Payment;
