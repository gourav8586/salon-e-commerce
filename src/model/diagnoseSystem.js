const mongoose = require("mongoose");

/* =======================
   Brand Schema
======================= */
const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },

    hasSPProducts: {
      type: Boolean,
      default: false, // UI / info only
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    spProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ], // OPTIONAL
  },
  { _id: false }
);

/* =======================
   SubType Schema
======================= */
const subTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Oily, Dry, Sensitive
    },

    brands: {
      type: [brandSchema],
      required: true,
    },
  },
  { _id: false }
);

/* =======================
   Diagnose System Schema
======================= */
const diagnoseSystemSchema = new mongoose.Schema(
  {
    diagnoseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diagnoseCategory",
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true, // Dry, Acne, Damage
    },

    // Used when sub-types exist
    subTypes: {
      type: [subTypeSchema],
      default: undefined,
    },

    // Used when no sub-types
    brands: {
      type: [brandSchema],
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

/* =======================
   Validation
======================= */
diagnoseSystemSchema.pre("validate", function (next) {
  if (this.brands && this.subTypes) {
    return next(new Error("Use either brands or subTypes, not both"));
  }

  if (!this.brands && !this.subTypes) {
    return next(new Error("Either brands or subTypes is required"));
  }

  next();
});

/* =======================
   Index
======================= */
diagnoseSystemSchema.index({ diagnoseCategory: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("diagnoseSystem", diagnoseSystemSchema);
