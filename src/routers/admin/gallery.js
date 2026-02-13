const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  addOrUpdateGalleryByCategory,
  deleteSelectedGalleryItemsByCategory,
  getGallery,
} = require("../../controllers/admin/gallery");


// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/gallery");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

// Add or update gallery (single document)
router.post(
  "/addAndUpdateGallery",
  
  upload.array("images", 10), // multiple image upload
  addOrUpdateGalleryByCategory
);

// Bulk delete selected images/videos
router.post("/deleteGallery", deleteSelectedGalleryItemsByCategory);

router.get("/getGallery", getGallery);

module.exports = router;
