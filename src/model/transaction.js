// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  type: {
    type: String,
    enum: ["PAYMENT", "REFUND"],
    required: true,
  },
  amount: {
    type: Number,
    required: true, // in INR
  },
  method: {
    type: String,
    default: "Razorpay",
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Refunded", "Failed"],
    default: "Pending",
  },
  paymentId: { type: String }, // Razorpay payment id
  refundId: { type: String }, // Razorpay refund id (for REFUND type)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
