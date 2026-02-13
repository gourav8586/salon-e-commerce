const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addProduct,
  deleteProduct,
  getProductByName,
  getAllProducts,
  updateProduct,
  addReview,
} = require("../../controllers/admin/product");
// ✅ Multer setup for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =============== ADD PRODUCT ===============
router.post(
  "/addProduct",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
    { name: "variationImages" }, // single image per variation
  ]),
  addProduct,
);

// =============== GET PRODUCT BY NAME ===============
router.get("/getProductByName/:name", getProductByName);
// =============== GET ALL PRODUCTS ===============
router.get("/getAllProducts", getAllProducts);
// =============== UPDATE PRODUCT ===============
router.put(
  "/updateProduct/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
    { name: "variationImages" },
  ]),
  updateProduct,
);

// =============== DELETE PRODUCT ===============
router.delete("/deleteProduct/:id", deleteProduct);

// =============== ADD REVIEW ===============
router.post("/addReview", addReview);

module.exports = router;
