const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: { type: String },
  authorName: {
    type: String,
  },
  tags: [String] ,
  description: { type: String },
  image: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogModel = mongoose.model("blog", blogSchema);
module.exports = blogModel;
