const express = require("express");
const router = express.Router();
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require("../../controllers/admin/productCategory");
const auth = require("../../../auth/adminauth");

// =============== ADD CATEGORY ===============
router.post("/addCategory", auth, addCategory);

// =============== DELETE CATEGORY ===============
router.delete("/deleteCategory/:id", auth, deleteCategory);

// =============== GET ALL CATEGORIES ===============
router.get("/getAllCategories", getAllCategories);

// =============== UPDATE CATEGORY ===============
router.put("/updateCategory/:id", auth, updateCategory);

module.exports = router;
