let admin = require("../../model/admin");
let bcrypt = require("bcryptjs");

exports.change_pass = async (req, res) => {
  try {
    let adminId = req.admin._id;
    let password = req.body.pass;
    let newpass = req.body.newpass;
    console.log("newPass", newpass);
    let hashedPassword = await bcrypt.hash(newpass, 10);

    let data = await admin.findOne({ _id: adminId });
    let check = bcrypt.compareSync(password, data.pass);
    if (!check) {
      return res.status(404).json({
        message: "Password doesn't match",
        success: false,
      });
    }
    let passwordUpdate = await admin.findOneAndUpdate(
      { _id: adminId  },
      { $set: { pass: hashedPassword } }
    );
    if (passwordUpdate) {
      return res.status(200).json({
        data: passwordUpdate,
        success: true,
        message: "Password Update successfully",
      });
    } else {
      return res.status(400).json({
        data: [],
        success: false,
        message: "Password Update failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

