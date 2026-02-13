const contactUsModel = require("../../model/contactus");
const nodemailer = require("nodemailer");
const userModel = require("../../model/user");
const adminModel = require("../../model/admin");


// Reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your mail service
  auth: {
    user: "developerinfo1212@gmail.com",
    pass: "cocb txob mfpk zrar", // App password
  },
});

// Add Contact Us
exports.addContactUs = async (req, res) => {
  try {
    const contact = new contactUsModel(req.body);

    await contact.save();

    const adminFind = await adminModel.findOne({ role: "Admin" });
    const adminEmail = adminFind.email;
    // Send email to admin
    await transporter.sendMail({
      from: "developerinfo1212@gmail.com",
      to: adminEmail, // change to admin email
      subject: "New Contact Inquiry",
      html: `
        <h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Number:</strong> ${contact.number}</p>
        <p><strong>Message:</strong> ${contact.message}</p>
      `,
    });

    // Optional: Send confirmation email to user
    await transporter.sendMail({
      from: "developerinfo1212@gmail.com",
      to: contact.email,
      subject: "We received your inquiry",
      html: `
        <p>Hi ${contact.name},</p>
        <p>Thank you for contacting us. We will get back to you shortly.</p>
      `,
    });

    res.status(201).json({ message: "Contact inquiry added", contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add contact inquiry", error });
  }
};

