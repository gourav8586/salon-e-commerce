// config/razorpay.js
const Razorpay = require("razorpay");
// controllers/orderController.js
const crypto = require("crypto");
const Cart = require("../../model/cart");
const Order = require("../../model/orderHisory");
const Transaction = require("../../model/transaction");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({ success: true, order });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Payment initiation failed" });
  }
};

exports.verifyAndPlaceOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
    } = req.body;

    // 🔑 Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    // ✅ Payment verified → Get cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Prepare products
    const orderProducts = cart.products.map((item) => {
      const finalPrice = item.price.offer || item.price.regular;
      return {
        product: item.product._id,
        variation: item.variation,
        quantity: item.quantity,
        price: {
          regular: item.price.regular,
          offer: item.price.offer,
        },
        subtotal: finalPrice * item.quantity,
      };
    });

    const totalAmount = orderProducts.reduce((sum, p) => sum + p.subtotal, 0);

    // Save order
    const newOrder = new Order({
      user: userId,
      products: orderProducts,
      totalAmount,
      paymentInfo: {
        method: "Razorpay",
        status: "Paid",
        transactionId: razorpay_payment_id,
      },
      shippingAddress,
      orderStatus: "Processing",
    });

    await newOrder.save();

    // Empty cart
    cart.products = [];
    await cart.save();

    // Save transaction record
    const paymentTxn = new Transaction({
      user: userId,
      order: newOrder._id,
      type: "PAYMENT",
      amount: totalAmount,
      method: "Razorpay",
      status: "Paid",
      paymentId: razorpay_payment_id,
    });

    await paymentTxn.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Error verifying order:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.cancelOrderAndRefund = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.body;

    // 1. Find order
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // 2. Prevent duplicate cancel
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ success: false, message: "Order already cancelled" });
    }

    // 3. Refund only if Razorpay + Paid
    if (order.paymentInfo.method === "Razorpay" && order.paymentInfo.status === "Paid") {
      const refund = await razorpay.payments.refund(order.paymentInfo.transactionId, {
        amount: order.totalAmount * 100,
        speed: "optimum",
      });

      // Save refund transaction
      const refundTxn = new Transaction({
        user: userId,
        order: order._id,
        type: "REFUND",
        amount: order.totalAmount,
        method: "Razorpay",
        status: refund.status || "Refunded", // actual Razorpay status
        paymentId: order.paymentInfo.transactionId, // original payment
        refundId: refund.id, // new refund
      });

      await refundTxn.save();

      // 4. Update order only if refund succeeded
      if (refund.status === "processed" || refund.status === "created") {
        order.orderStatus = "Cancelled";
        order.paymentInfo.status = "Refunded";
        order.paymentInfo.refundId = refund.id;
        await order.save();
      } else {
        return res.status(500).json({
          success: false,
          message: "Refund failed at Razorpay",
          refund,
        });
      }

      return res.json({
        success: true,
        message: "Order cancelled & refund initiated",
        refund,
      });
    } else {
      // COD or unpaid order
      order.orderStatus = "Cancelled";
      await order.save();

      return res.json({
        success: true,
        message: "Order cancelled",
        order,
      });
    }
  } catch (err) {
    console.error("Refund error:", err);
    res.status(500).json({ success: false, message: "Refund failed" });
  }
};
