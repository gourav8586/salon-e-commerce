const transactionModel = require("../../model/transaction");

exports.getTransactionHistory = async (req, res) => {
  try {
    const txns = await transactionModel.find().sort({ createdAt: -1 });
    res.json({ success: true, transactions: txns });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
