const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "paid"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
