const Appointment = require("../../model/appointment");
const nodemailer = require("nodemailer");

// ➕ Add Appointment
exports.addAppointment = async (req, res) => {
  try {
    const {
      userId,
      customerName,
      email,
      phone,
      appointmentDate,
      appointmentTime,
      category,
      services,
    } = req.body;
console.log(req.body);

    // 1. Save to DB
    const appointment = new Appointment({
      userId,
      customerName,
      email,
      phone,
      appointmentDate,
      appointmentTime,
      category,
      services,
    });

    await appointment.save();

    // 2. Setup Mail Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your mail service
      auth: {
        user: "developerinfo1212@gmail.com",
        pass: "cocb txob mfpk zrar", // App password
      },
    });

    // 3. Mail Options
    const mailOptions = {
      from: "developerinfo1212@gmail.com",
      to: email,
      subject: "Your Appointment Confirmation - Riva A Theme Salon",
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #ff7eb3, #ff758c); color: #fff; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">Appointment Confirmed ✅</h1>
    </div>
    <div style="padding: 20px;">
      <p style="font-size: 16px;">Hi <b>${customerName}</b>,</p>
      <p style="font-size: 15px;">Thank you for booking with us. Your appointment details are below:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><b>Date</b></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${new Date(
            appointmentDate
          ).toDateString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><b>Time</b></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointmentTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><b>Category</b></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${category}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><b>Services</b></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${services.join(
            ", "
          )}</td>
        </tr>
      </table>
    </div>
    <div style="background: #f2f2f2; text-align: center; padding: 15px; font-size: 13px; color: #777;">
      <p style="margin: 0;">💇 Thank you for choosing <b>Riva A Theme Salon</b></p>
    </div>
  </div>
  `,
    };

    // 4. Send Mail
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Appointment created and confirmation email sent",
      data: appointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const user = req.user._id;
    const appointments = await Appointment.find({ userId: user }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
