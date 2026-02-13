const orderHistory = require("../../model/orderHisory");
const userModel = require("../../model/user");

exports.adminGetOrderHistory = async (req, res) => {
  try {
    const orders = await orderHistory
      .find()
      .populate("user") // populate user info
      .populate("products.product") // populate product info inside array
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.adminGetOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderHistory
      .findOne({ _id: orderId })
      .populate("user") // populate user info
      .populate("products.product"); // populate product info inside array
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

