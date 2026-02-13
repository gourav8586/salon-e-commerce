const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to user model
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to product
        required: true,
      },
      variation: {
        type: String, // e.g., "Large", "Red" (from product.variations.value)
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      price: {
        regular: { type: Number },
        offer: { type: Number },
      },
    },
  ],

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
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
