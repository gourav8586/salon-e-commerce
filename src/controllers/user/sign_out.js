let user = require("../../model/user");

exports.Sign_Out = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("sujwt", { httpOnly: true });
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
