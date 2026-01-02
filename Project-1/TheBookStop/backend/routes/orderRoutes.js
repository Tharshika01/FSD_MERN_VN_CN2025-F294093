const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// CREATE ORDER
router.post("/create", protect, async (req, res) => {
  try {
    const { bookId, price } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items: [{ book: bookId }],
      totalAmount: price,
      status: "paid"
    });

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET MY ORDERS
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
      status: { $ne: "cart" }
    }).populate("items.book");


    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
