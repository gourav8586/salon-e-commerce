let admin = require("../../model/admin");

exports.Sign_Out = async (req, res) => {
  try {
    // let token = req.cookies.sdjwt;
    // Clear the JWT cookie
    res.clearCookie("sdjwt", { httpOnly: true });
    return res.status(200).json({
      message: "Logout successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred during logout.",
      success: false,
      status: 500,
    });
  }
};
