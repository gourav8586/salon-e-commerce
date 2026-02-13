const orderHistory = require("../../model/orderHisory");
const userModel = require("../../model/user");

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderHistory.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderHistory.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
