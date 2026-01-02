const router = require("express").Router();
const Review = require("../models/Review");
const { protect } = require("../middleware/authMiddleware");

// Get reviews of a book
router.get("/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review
router.post("/:bookId", protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      book: req.params.bookId,
      user: req.user.id,
      name: req.user.name,
      rating,
      comment
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
