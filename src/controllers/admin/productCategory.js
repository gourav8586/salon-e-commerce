const categoryModel = require("../../model/productCategory");
// Helper to normalize name (trim + lowercase for comparison)
const normalizeName = (name) => name.trim().toLowerCase();

// Add Category
exports.addCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    const trimmedName = name?.trim();
    if (!trimmedName)
      return res.status(400).json({ message: "Name is required" });

    // Check for existing category with same name and same parent
    const existing = await categoryModel.findOne({
      name: { $regex: `^${normalizeName(trimmedName)}$`, $options: "i" },
      parentCategory: parentCategory || null
    });
    
    if (existing)
      return res.status(400).json({ message: "Category already exists in this level" });

    const newCategory = await categoryModel.create({
      name: trimmedName,
      parentCategory: parentCategory || null
    });
    
    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, subCategories } = req.body;
    const trimmedName = name?.trim();
    if (!trimmedName)
      return res.status(400).json({ message: "Name is required" });

    const existing = await categoryModel.findOne({
      _id: { $ne: id },
      name: { $regex: `^${normalizeName(trimmedName)}$`, $options: "i" },
    });
    if (existing)
      return res
        .status(400)
        .json({ message: "Another category with the same name exists" });

    const updated = await categoryModel.findByIdAndUpdate(
      id,
      { name: trimmedName, subCategories: subCategories || [] },
      { new: true },
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
