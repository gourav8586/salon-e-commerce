const contactUsModel = require("../../model/contactus");

// Update Contact Us Status
exports.updateContactUsStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await contactUsModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Contact inquiry not found" });

    res.status(200).json({ message: "Status updated", contact: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update status", error });
  }
};

// Get All Contact Us
exports.getContactUs = async (req, res) => {
  try {
    const contacts = await contactUsModel.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contact inquiries", error });
  }
};

// Delete Contact Us
exports.deleteContactUs = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await contactUsModel.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Contact inquiry not found" });
    res.status(200).json({ message: "Contact inquiry deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete contact inquiry", error });
  }
};
