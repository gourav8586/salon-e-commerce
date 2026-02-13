const mongoose = require("mongoose");

const diagnoseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const diagnoseCategoryModel = mongoose.model(
  "diagnoseCategory",
  diagnoseCategorySchema
);
module.exports = diagnoseCategoryModel;
