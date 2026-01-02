const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const Wishlist = require("../models/Wishlist");

// ADD
router.post("/add", protect, async (req, res) => {
  const { bookId } = req.body;

  const already = await Wishlist.findOne({
    user: req.user.id,
    book: bookId
  });

  if (already) return res.json({ message: "Already in wishlist" });

  await Wishlist.create({
    user: req.user.id,
    book: bookId
  });

  res.json({ message: "Added to wishlist" });
});

// GET
router.get("/", protect, async (req, res) => {
  const list = await Wishlist.find({ user: req.user.id }).populate("book");
  res.json(list);
});

// REMOVE
router.delete("/:id", protect, async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed" });
});

module.exports = router;
