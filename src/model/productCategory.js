const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    children: [this], // recursive nesting
  },
  { _id: false },
);

// productCategory model update
const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    default: null,
  },

  subCategories: [String], // Simple array for subcategories

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
);

module.exports = ProductCategory;
