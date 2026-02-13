const express = require("express");
const router = express.Router();
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  createDiagnoseSystem,
  getAllDiagnoseSystems,
  getDiagnoseSystemById,
  updateDiagnoseSystem,
  deleteDiagnoseSystem,
} = require("../../controllers/admin/diagnoseSystem");

// =============== ADD CATEGORY ===============
router.post("/addDiagnoseCategory", addCategory);

// =============== DELETE CATEGORY ===============
router.delete("/deleteDiagnoseCategory/:id", deleteCategory);

// =============== GET ALL CATEGORIES ===============
router.get("/getAllDiagnoseCategories", getAllCategories);

// =============== UPDATE CATEGORY ===============
router.put("/updateDiagnoseCategory/:id", updateCategory);

// CREATE
router.post("/diagnose-system", createDiagnoseSystem);

// READ
router.get("/diagnose-system", getAllDiagnoseSystems);
router.get("/diagnose-system/:id", getDiagnoseSystemById);

// UPDATE
router.put("/diagnose-system/:id", updateDiagnoseSystem);

// DELETE
router.delete("/diagnose-system/:id", deleteDiagnoseSystem);

module.exports = router;
