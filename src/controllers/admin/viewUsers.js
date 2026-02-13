const userModel = require("../../model/user");

exports.viewUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.viewUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete({ _id: userId });
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.Update_user = async (req, res) => {
  try {
    const {
      name,
      mobile,
      dateOfBirth,
      address,
      state,
      gender,
      city,
      country,
      id: userId
    } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find existing user
    const existing_user = await userModel.findById(userId);

    if (!existing_user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Handle image upload
    const user_image = req.file ? req.file.filename : existing_user.user_image;

    // Update user data
    const updateFields = {
      name,
      mobile,
      dateOfBirth,
      address,
      state,
      gender,
      city,
      country,
      user_image,
    };

    // Remove undefined fields
    Object.keys(updateFields).forEach(key => 
      updateFields[key] === undefined && delete updateFields[key]
    );

    const update_data = await userModel.findByIdAndUpdate(
      userId,
      updateFields,
      { 
        new: true,
        runValidators: true
      }
    );

    if (!update_data) {
      return res.status(400).json({
        success: false,
        message: "Failed to update user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      data: update_data,
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating user",
      error: error.message
    });
  }
};