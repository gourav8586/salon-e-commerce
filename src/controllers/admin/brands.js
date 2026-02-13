const brandModel = require("../../model/brands");

// Add a new brand
exports.addBrand = async (req, res) => {
  try {
    const { name } = req.body,
      image = req.file ? req.file.filename : null;
    const newBrand = new brandModel({ name, image });
    await newBrand.save();
    res
      .status(201)
      .json({ message: "Brand added successfully", brand: newBrand });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await brandModel.find().sort({ Timestamp: -1 });
    res.status(200).json({ brands });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await brandModel.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;
    const updatedData = { name };
    if (image) {
      updatedData.image = image;
    }
    const updatedBrand = await brandModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res
      .status(200)
      .json({ message: "Brand updated successfully", brand: updatedBrand });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
