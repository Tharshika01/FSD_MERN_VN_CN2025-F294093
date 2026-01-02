const Review = require("../models/Review");

/**
 * @desc    Add review & comment
 * @route   POST /api/reviews
 * @access  Private (User)
 */
exports.addReview = async (req, res) => {
  try {
    const { book, comment, rating } = req.body;

    if (!book || !comment || !rating) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      book,
      user: req.user.id
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this book" });
    }

    const review = await Review.create({
      book,
      user: req.user.id,
      comment,
      rating
    });

    res.status(201).json({
      message: "Review added successfully",
      review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get reviews for a book
 * @route   GET /api/reviews/:bookId
 * @access  Public
 */
exports.getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete review
 * @route   DELETE /api/reviews/:id
 * @access  Private (Admin or Owner)
 */
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Only admin or review owner can delete
    if (req.user.role !== "admin" && review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
