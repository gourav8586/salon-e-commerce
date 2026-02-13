const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  genderType: {
    type: String,
  },

  category: {
    type: String,
  },

  subCategory: [String],

  specialProduct: {
    type: Boolean,
    default: false,
  },

  brandName: {
    type: String,
  },

  quantity: {
    type: Number,
    default: 0, // for simple products
  },

  // Used if product has no variations
  price: {
    regular: { type: Number },
    offer: { type: Number },
  },

  type: { type: String }, // e.g., "Size", "200", "400",
  value: { type: String },

  description: {
    type: String,
  },

  features: {
    type: [String], // array of features
  },

  productInformation: [
    {
      heading: {
        type: String,
        required: true,
      },
      points: [
        {
          inputName: {
            type: String,
            required: true,
          },
          inputValue: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],

  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  // Product variations (optional)
  variations: [
    {
      type: { type: String }, // e.g., "Size", "200", "400",
      value: { type: String }, // e.g., "GM", "ML"
      price: {
        regular: { type: Number },
        offer: { type: Number }, // optional offer price
      },
      variationImages: { type: String }, // variation-specific image
      quantity: { type: Number, default: 0 },
    },
  ],

  mainImage: {
    type: String,
  },

  galleryImages: {
    type: [String],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
