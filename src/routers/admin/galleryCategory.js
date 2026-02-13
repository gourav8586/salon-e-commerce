const express = require("express");
const router = express.Router();
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require("../../controllers/admin/galleryCategory");

// =============== ADD CATEGORY ===============
router.post("/addGalleryCategory", addCategory);

// =============== DELETE CATEGORY ===============
router.delete("/deleteGalleryCategory/:id", deleteCategory);

// =============== GET ALL CATEGORIES ===============
router.get("/getAllGalleryCategories", getAllCategories);

// =============== UPDATE CATEGORY ===============
router.put("/updateGalleryCategory/:id", updateCategory);

module.exports = router;
