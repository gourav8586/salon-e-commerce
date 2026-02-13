const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../../model/admin");
exports.adminLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.pass;
    let data = await admin.findOne({ email });

    if (!data) {
      return res.status(404).json({
        message: "Email not found",
        success: false,
      });
    }

    let check = bcrypt.compareSync(password, data.pass);
    if (!check) {
      return res.status(404).json({
        message: "Password doesn't match",
        success: false,
      });
    }

    console.log("admin Logged in");
    console.log("ID is", data._id);

    const token = jwt.sign({ _id: data._id.toString() }, "soladi", {
      expiresIn: "1d",
    });


    res.cookie("sdjwt", token);

    return res.status(200).json({
      message: "Admin Login successfull",
      email: data.email,
      data: data,
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login Page Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
