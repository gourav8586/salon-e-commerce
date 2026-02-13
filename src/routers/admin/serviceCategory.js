const express = require("express");
const router = express.Router();
const {
  addServiceCategory,
  deleteServiceCategory,
  getAllServiceCategories,
  updateServiceCategory,
} = require("../../controllers/admin/serviceCategory");
const auth = require("../../../auth/adminauth");
const multer = require("multer");
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});


// =============== ADD SERVICE CATEGORY ===============
router.post("/addServiceCategory",  upload.single("categoryImage"), addServiceCategory);

// =============== DELETE SERVICE CATEGORY ===============
router.delete("/deleteServiceCategory/:id",  deleteServiceCategory);

// =============== GET ALL SERVICE CATEGORIES ===============
router.get("/getAllServiceCategories", getAllServiceCategories);

// =============== UPDATE SERVICE CATEGORY ===============
router.put("/updateServiceCategory/:id",  upload.single("categoryImage"), updateServiceCategory);

module.exports = router;
