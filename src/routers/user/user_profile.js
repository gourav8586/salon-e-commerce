let express = require("express");
const {
  Update_user,
  user_profile,
} = require("../../controllers/user/user_profile");
let router = express.Router();
let auth = require("../../../auth/userauth");
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

router.get("/userProfile", auth, user_profile);
router.put("/updateUserProfile", auth, upload.single("user_image"), Update_user);

module.exports = router;
