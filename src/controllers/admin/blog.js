const blogModel = require("../../model/blog");

// Helper: convert tags to array if needed
const formatTags = (tags) => {
  if (!tags) return [];

  // Case 1: already array
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim());
  }

  // Case 2: JSON string (["a","b"])
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) {
        return parsed.map((tag) => tag.trim());
      }
    } catch (err) {
      // fallback: comma separated
      return tags.split(",").map((tag) => tag.trim());
    }
  }

  return [];
};

// Add Blog
exports.addBlog = async (req, res) => {
  try {
    const { name, category, authorName, tags, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const existingBlog = await blogModel.findOne({ name: name.trim() });
    if (existingBlog) {
      return res
        .status(400)
        .json({ message: "Blog with this name already exists" });
    }

    const newBlog = new blogModel({
      name: name.trim(),
      category,
      authorName,
      tags: formatTags(tags),
      description,
      image,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, authorName, tags, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const existingBlog = await blogModel.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });
    if (existingBlog) {
      return res
        .status(400)
        .json({ message: "Another blog with this name already exists" });
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      {
        name: name?.trim(),
        category,
        authorName,
        tags: formatTags(tags),
        description,
        ...(image && { image }),
      },
      { new: true },
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await blogModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Get Blog By Name
exports.getBlogByName = async (req, res) => {
  try {
    const { name } = req.params;
    const blog = await blogModel.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
