const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const Book = require("../models/Book");
const Order = require("../models/Order");

// Seller Stats
router.get("/stats", protect, async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({ seller: req.user.id });

    let totalOrders = 0;
    if (Order) {
      totalOrders = await Order.countDocuments({ seller: req.user.id }).catch(() => 0);
    }

    res.json({
      totalBooks,
      totalOrders
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
