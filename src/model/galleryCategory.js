const mongoose = require("mongoose");

const galleryCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const galleryCategoryModel = mongoose.model(
  "galleryCategory",
  galleryCategorySchema
);
module.exports = galleryCategoryModel;
