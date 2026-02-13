const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Who purchased
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Purchased product
        required: true,
      },
      variation: {
        type: String, // e.g., "Large", "Red"
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        regular: { type: Number },
        offer: { type: Number },
      },
      subtotal: {
        type: Number, // quantity * final price
        required: true,
      },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentInfo: {
    method: { type: String }, // e.g., Razorpay, COD, Stripe
    status: { type: String, default: "Pending" }, // Pending, Paid, Failed
    transactionId: { type: String }, // Razorpay/Stripe/UPI id
     refundId: { type: String }, // Razorpay refund id
  },

  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to auto-update "updatedAt"
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
