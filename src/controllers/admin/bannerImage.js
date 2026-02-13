const bannerModel = require("../../model/banner");
const fs = require("fs");
const path = require("path");

// ➕ Add Banner (array of objects)
exports.addBanner = async (req, res) => {
  try {
    const files = req.files || [];
    const {
      title = [],
      subtitle = [],
      paragraph = [],
      link = [],
      buttontext = [],
    } = req.body;

    const banners = files.map((file, index) => ({
      image: file.filename,
      title: Array.isArray(title) ? title[index] : title,
      subtitle: Array.isArray(subtitle) ? subtitle[index] : subtitle,
      paragraph: Array.isArray(paragraph) ? paragraph[index] : paragraph,
      link: Array.isArray(link) ? link[index] : link,
      buttontext: Array.isArray(buttontext) ? buttontext[index] : buttontext,
    }));

    const bannerDoc = new bannerModel({ banners });
    await bannerDoc.save();

    res.status(201).json({
      success: true,
      message: "Banner added",
      data: bannerDoc,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📥 Get All Banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await bannerModel.find();
    res.status(200).json({ success: true, data: banners });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Update Single Banner Item (not all items)
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.files && req.files[0];
    const {
      title,
      subtitle,
      paragraph,
      link,
      buttontext,
      index,
      currentImage
    } = req.body;

    const banner = await bannerModel.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner document not found",
      });
    }

    const bannerIndex = parseInt(index);
    if (bannerIndex < 0 || bannerIndex >= banner.banners.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid banner index",
      });
    }

    // If new image is uploaded, delete old one
    let newImageName = currentImage;
    if (file) {
      // Delete old image if it exists and is different from new one
      const oldImage = banner.banners[bannerIndex].image;
      if (oldImage && oldImage !== file.filename) {
        const oldFilePath = path.resolve("public/uploads/banners", oldImage);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      newImageName = file.filename;
    }

    // Update only the specific banner item
    banner.banners[bannerIndex] = {
      image: newImageName,
      title: title || "",
      subtitle: subtitle || "",
      paragraph: paragraph || "",
      link: link || "",
      buttontext: buttontext || "",
    };

    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Delete single banner item AND document if empty
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const banner = await bannerModel.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Check if this is the last banner in the array
    const isLastBanner = banner.banners.length === 1;
    
    // Filter out the banner to be deleted
    const bannerToDelete = banner.banners.find(item => item.image === image);
    banner.banners = banner.banners.filter(
      (item) => item.image !== image
    );

    // If banners array becomes empty AND it was the last banner, delete entire document
    if (banner.banners.length === 0 && isLastBanner) {
      // Delete image file first
      if (bannerToDelete && bannerToDelete.image) {
        const filePath = path.resolve("public/uploads/banners", bannerToDelete.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      // Delete the entire document from MongoDB
      await bannerModel.findByIdAndDelete(id);
      
      return res.status(200).json({
        success: true,
        message: "All banners deleted and document removed",
        data: null,
      });
    } else {
      // Save the updated banner (with remaining banners)
      await banner.save();

      // Delete image file
      if (bannerToDelete && bannerToDelete.image) {
        const filePath = path.resolve("public/uploads/banners", bannerToDelete.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return res.status(200).json({
        success: true,
        message: "Banner item deleted",
        data: banner,
      });
    }
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};