let express = require("express");
const { Admin_profile,Update_admin } = require("../../controllers/admin/admin_profile");
let router = express.Router();
let auth = require("../../../auth/adminauth");
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

router.get("/adminProfile", auth, Admin_profile);
router.put("/update_profile", auth, upload.single("admin_image"), Update_admin);

module.exports = router;
