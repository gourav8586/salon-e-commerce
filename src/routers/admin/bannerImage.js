const express = require("express");
const router = express.Router(); 
const {
  addBanner,
  deleteBanner,
  getBanners,
  updateBanner,
} = require("../../controllers/admin/bannerImage");

const multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/banners");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

// Add Banner (multiple images)
router.post("/addBanner", upload.array("image", 10), addBanner);

// Get Banners
router.get("/getBanner", getBanners);

// Update Banner
router.put("/updateBanner/:id", upload.array("image", 10), updateBanner);

// Delete Banner
router.delete("/deleteBanner/:id", deleteBanner);

module.exports = router;
