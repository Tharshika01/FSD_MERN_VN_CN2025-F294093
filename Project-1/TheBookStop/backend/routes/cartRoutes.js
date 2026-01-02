const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// ADD TO CART
router.post("/add", protect, async (req, res) => {
  try {
    const { bookId } = req.body;

    let cart = await Order.findOne({ user: req.user.id, status: "cart" });

    if (!cart) {
      cart = await Order.create({
        user: req.user.id,
        status: "cart",
        items: []
      });
    }

    cart.items.push({ book: bookId });
    await cart.save();

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET CART
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Order.findOne({
      user: req.user.id,
      status: "cart"
    }).populate("items.book");

    if (!cart) return res.json([]);

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REMOVE ITEM
router.delete("/:id", protect, async (req, res) => {
  try {
    await Order.updateOne(
      { user: req.user.id, status: "cart" },
      { $pull: { items: { _id: req.params.id } } }
    );

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
