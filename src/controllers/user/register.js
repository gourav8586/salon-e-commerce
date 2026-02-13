let user = require("../../model/user");
let bcrypt = require("bcryptjs");

exports.userRegister = async (req, res) => {
  try {
    let { name, email, pass: password, mobile } = req.body;

    // Check if password is provided and not empty
    if (!password || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    // Check if a user already exists
    let existingUser = await user.findOne({ email: email });
    console.log("exist", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let rec = new user({
      name,
      mobile,
      email,
      pass: hashedPassword,
      role: "User",
    });

    let saved_data = await rec.save();

    if (saved_data) {
      return res.status(200).json({
        message: "User registered successfully",
        data: saved_data,
        success: true,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "User registration failed",
      });
    }
  } catch (error) {
    console.error("Error in register API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
