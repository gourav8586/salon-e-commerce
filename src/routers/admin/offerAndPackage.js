const express = require("express");
const router = express.Router();
const {
  addOfferAndPackage,
  getOffersAndPackages,
  updateOfferAndPackage,
  deleteOfferAndPackage,
  toggleActiveStatus,
  getOfferAndPackageById,
} = require("../../controllers/admin/offerAndPackage");
const auth = require("../../../auth/adminauth");
// Add Offer/Package
router.post("/addOfferPackage", addOfferAndPackage);

// Get All
router.get("/getOfferPackages", getOffersAndPackages);

// GET offer/:offerId
router.get("/offer/:id", getOfferAndPackageById);

// Update
router.patch("/updateOfferPackage/:id", auth, updateOfferAndPackage);

// Delete
router.delete("/deleteOfferPackage/:id", auth, deleteOfferAndPackage);

// Toggle Active/Inactive
router.patch("/toggleOfferPackage/:id", auth, toggleActiveStatus);

module.exports = router;
