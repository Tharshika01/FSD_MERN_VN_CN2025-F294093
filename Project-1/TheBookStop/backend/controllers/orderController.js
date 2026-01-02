const Order = require("../models/Order");

/**
 * @desc    Create order (Dummy Payment)
 * @route   POST /api/orders
 * @access  Private (User)
 */
exports.createOrder = async (req, res) => {
  try {
    const { books, total } = req.body;

    if (!books || books.length === 0) {
      return res.status(400).json({ message: "No books in cart" });
    }

    const order = await Order.create({
      user: req.user.id,
      books,
      total,
      paymentStatus: "Paid (Dummy)"
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/my-orders
 * @access  Private (User)
 */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private (Admin)
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
