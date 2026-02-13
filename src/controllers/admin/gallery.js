const fs = require("fs");
const path = require("path");
const Gallery = require("../../model/gallery");

// Add or update gallery items by category
exports.addOrUpdateGalleryByCategory = async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.filename) : [];
    const { videosUrl, category } = req.body;
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });

    // Find gallery document for this category
    let gallery = await Gallery.findOne({ category });

    if (!gallery) {
      // Create new category document
      gallery = new Gallery({
        category,
        images: images,
        videosUrl: videosUrl ? [].concat(videosUrl) : [],
      });
    } else {
      // Update existing category document
      if (images && images.length > 0) {
        gallery.images.push(...images);
      }
      if (videosUrl) {
        gallery.videosUrl.push(...[].concat(videosUrl));
      }
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      data: gallery,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Bulk delete selected images or videos by category
exports.deleteSelectedGalleryItemsByCategory = async (req, res) => {
  try {
    const { images = [], videosUrl = [], category } = req.body;
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });

    let gallery = await Gallery.findOne({ category });
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found for this category",
      });
    }

    // Remove selected images
    if (images.length > 0) {
      gallery.images = gallery.images.filter((img) => !images.includes(img));
      images.forEach((img) => {
        // Use process.cwd() to build path from project root where multer stored files
        const filePath = path.join(process.cwd(), "public", "gallery", img);
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (e) {
          // Log and continue; don't fail the whole operation if a single file can't be deleted
          console.warn(`Failed to delete file ${filePath}:`, e.message);
        }
      });
    }

    // Remove selected videos
    if (videosUrl.length > 0) {
      gallery.videosUrl = gallery.videosUrl.filter(
        (video) => !videosUrl.includes(video)
      );
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Selected gallery items deleted successfully",
      data: gallery,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get gallery (newest first)
exports.getGallery = async (req, res) => {
  try {
    // Return an array of gallery documents. Reverse images/videos in each document so newest appear first
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    const mapped = galleries.map((g) => {
      const obj = g.toObject();
      return {
        ...obj,
        // ensure category is a string so frontend comparisons work (categoryId === category)
        category: obj.category ? obj.category.toString() : obj.category,
        images: Array.isArray(obj.images) ? [...obj.images].reverse() : [],
        videosUrl: Array.isArray(obj.videosUrl)
          ? [...obj.videosUrl].reverse()
          : [],
      };
    });

    res.status(200).json({
      success: true,
      message: "Gallery fetched successfully",
      data: mapped,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
