// const appointment = require("../../model/appointment");
// exports.getAppointments = async (req, res) => {
//   try {
//     const appointments = await appointment.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       data: appointments,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.updateAppointmentStatus = async (req, res) => {
//   try {
//     const { appointmentId, status } = req.body;
//     const appointment = await appointment.findByIdAndUpdate(
//       appointmentId,
//       { status },
//       { new: true }
//     );
//     if (!appointment) {
//       return res.status(404).json({ success: false, message: "Appointment not found" });
//     }
//     res.status(200).json({
//       success: true,
//       data: appointment,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.deleteAppointment = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const appointment = await appointment.findByIdAndDelete(appointmentId);
//     if (!appointment) {
//       return res.status(404).json({ success: false, message: "Appointment not found" });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Appointment deleted successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


const Appointment = require("../../model/appointment");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({
      success: true,
      data: updatedAppointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!deletedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};