const categoryModel = require("../../model/diagnoseCategory");
// Helper to normalize name (trim + lowercase for comparison)
const normalizeName = (name) => name.trim().toLowerCase();
const DiagnoseSystem = require("../../model/diagnoseSystem");

// Add Category
exports.addCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await categoryModel.findOne({
      name: { $regex: `^${normalizeName(name)}$`, $options: "i" },
    });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = await categoryModel.create({ name });
    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await categoryModel.findOne({
      _id: { $ne: id },
      name: { $regex: `^${normalizeName(name)}$`, $options: "i" },
    });
    if (existing)
      return res
        .status(400)
        .json({ message: "Another category with the same name exists" });

    const updated = await categoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await categoryModel.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    res.status(200).json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* =======================
   CREATE (ADD)
======================= */
exports.createDiagnoseSystem = async (req, res) => {
    try {
      console.log(req.body.brands[0].products);

    const data = await DiagnoseSystem.create(req.body);

    res.status(201).json({
      success: true,
      message: "Diagnose system created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =======================
   GET ALL
======================= */
exports.getAllDiagnoseSystems = async (req, res) => {
  try {
    const data = await DiagnoseSystem.find()
      .populate("diagnoseCategory")
      .populate("brands.products")
      .populate("brands.spProducts")
      .populate("subTypes.brands.products")
      .populate("subTypes.brands.spProducts");

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =======================
   GET BY ID
======================= */
exports.getDiagnoseSystemById = async (req, res) => {
  try {
    const data = await DiagnoseSystem.findById(req.params.id)
      .populate("diagnoseCategory")
      .populate("brands.products")
      .populate("brands.spProducts")
      .populate("subTypes.brands.products")
      .populate("subTypes.brands.spProducts");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Diagnose system not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =======================
   UPDATE
======================= */
exports.updateDiagnoseSystem = async (req, res) => {
  try {
    const data = await DiagnoseSystem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Diagnose system not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Diagnose system updated successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =======================
   DELETE
======================= */
exports.deleteDiagnoseSystem = async (req, res) => {
  try {
    const data = await DiagnoseSystem.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Diagnose system not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Diagnose system deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
