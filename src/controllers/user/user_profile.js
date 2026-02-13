let user = require("../../model/user");

exports.user_profile = async (req, res) => {
  let userId = req.user._id;
  console.log("User ID:", userId);

  let data = await user.findOne({ _id: userId });
  if (data) {
    return res.status(200).json({
      data: data,
      message: "User Profile View",
      success: true,
    });
  } else {
    return res.status(400).json({
      data: [],
      message: "Data not found",
      success: false,
    });
  }
};

exports.Update_user = async (req, res) => {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let dateOfBirth = req.body.dateOfBirth;
  let address = req.body.address;
  let state = req.body.state;
  let gender = req.body.gender;
  let city = req.body.city;
  let country = req.body.country;
  let userId = req.user._id;

  // Handle file upload (only update if a new file is uploaded)
  let new_image = req.file ? req.file.filename : null;

  // Fetch the current (admin) to check existing image
  let existing_user = await user.findOne({ _id: userId });

  if (!existing_user) {
    return res.status(404).json({
      data: [],
      success: false,
      status: 404,
      message: "User not found",
    });
  }

  // Keep the existing image if no new one is uploaded
  let user_image = new_image ? new_image : existing_user.user_image;

  let update_data = await user.findOneAndUpdate(
    { _id: userId },
    {
      name: name,
      mobile: mobile,
      dateOfBirth: dateOfBirth,
      address: address,
      state: state,
      gender: gender,
      city: city,
      country: country,
      user_image: user_image,
    },
    { new: true } // return the updated document
  );

  console.log("User-", update_data);

  if (update_data) {
    return res.status(200).json({
      data: update_data,
      success: true,
      message: "User details updated",
    });
  } else {
    return res.status(400).json({
      data: [],
      success: false,
      message: "User can't update",
    });
  }
};
