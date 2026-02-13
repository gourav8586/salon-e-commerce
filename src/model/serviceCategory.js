const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  categoryImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const serviceCategoryModel = mongoose.model(
  "serviceCategory",
  serviceCategorySchema
);
module.exports = serviceCategoryModel;
