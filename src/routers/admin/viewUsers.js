const {
  Update_user,
  deleteUser,
  viewUserById,
  viewUsers,
} = require("../../controllers/admin/viewUsers");

let express = require("express");
let router = express.Router();
let auth = require("../../../auth/adminauth");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/adminViewUsers", auth, viewUsers);
router.get("/adminViewUserById/:id", auth, viewUserById);
router.delete("/adminDeleteUser/:id", auth, deleteUser);
router.put("/adminUpdateUser", auth, upload.single("user_image"), Update_user);

module.exports = router;
