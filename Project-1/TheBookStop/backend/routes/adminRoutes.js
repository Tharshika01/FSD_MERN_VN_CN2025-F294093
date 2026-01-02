const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const User = require("../models/User");
const Book = require("../models/Book");
const Order = require("../models/Order");


// 📊 DASHBOARD STATS
router.get("/stats", protect, adminOnly, async (req, res) => {
  const users = await User.countDocuments({ role: "user" });
  const sellers = await User.countDocuments({ role: "seller" });
  const books = await Book.countDocuments();
  const orders = await Order.countDocuments();

  res.json({ users, sellers, books, orders });
});


// 👤 GET ALL USERS
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
});


// 🛍 GET ALL SELLERS
router.get("/sellers", protect, adminOnly, async (req, res) => {
  const sellers = await User.find({ role: "seller" }).select("-password");
  res.json(sellers);
});


// 🚫 BLOCK USER/SELLER
router.put("/block/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
  res.json({ message: "User Blocked" });
});


// ✅ UNBLOCK USER/SELLER
router.put("/unblock/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
  res.json({ message: "User Unblocked" });
});


// ❌ DELETE USER / SELLER
router.delete("/delete/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted" });
});

module.exports = router;
