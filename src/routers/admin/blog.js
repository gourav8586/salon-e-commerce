const express = require("express");
const router = express.Router();
const {
  addBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  getBlogByName,
} = require("../../controllers/admin/blog");

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

// Create a new blog
router.post("/addBlog", upload.single("image"), addBlog);

// Update an existing blog
router.patch("/updateBlog/:id", upload.single("image"), updateBlog);

// Delete a blog
router.delete("/deleteBlog/:id", deleteBlog);

// Get all blogs
router.get("/getAllBlogs", getAllBlogs);

// Get blog by name
router.get("/getBlog/:name", getBlogByName);

module.exports = router;
