const express = require("express");
const router = express.Router();
const {
  addBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} = require("../../controllers/admin/brands");

const multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/brands");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.post("/createBrand", upload.single("image"), addBrand);
router.get("/brands", getAllBrands);
router.delete("/brand/:id", deleteBrand);
router.put("/brand/:id", upload.single("image"), updateBrand);

module.exports = router;
