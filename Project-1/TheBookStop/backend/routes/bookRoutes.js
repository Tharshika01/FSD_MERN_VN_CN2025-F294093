const express = require("express");
const Book = require("../models/Book");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ================= GET ALL BOOKS (PUBLIC) =================
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});


// ================= GET LOGGED SELLER BOOKS =================
router.get("/my-books", protect, authorize("seller", "admin"), async (req, res) => {
  const books = await Book.find({ seller: req.user.id });
  res.json(books);
});


// ================= ADD BOOK WITH IMAGE =================
router.post(
  "/create",
  protect,
  authorize("seller", "admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        price: req.body.price,
        description: req.body.description,
        seller: req.user.id,
        image: req.file ? `/uploads/${req.file.filename}` : null
      });

      await book.save();
      res.json({ message: "Book added successfully", book });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);


// ================= DELETE BOOK =================
router.delete("/:id",
  protect,
  authorize("seller", "admin"),
  async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);

      if (!book) return res.status(404).json({ message: "Book not found" });

      // Prevent deleting others' books
      if (req.user.role !== "admin" && book.seller.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not allowed" });
      }

      await book.deleteOne();
      res.json({ message: "Book deleted successfully" });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ================= GET SINGLE BOOK (PUBLIC) =================
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= UPDATE BOOK =================
router.put(
  "/:id",
  protect,
  authorize("seller", "admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);

      if (!book) return res.status(404).json({ message: "Book not found" });

      // Prevent editing others' books
      if (req.user.role !== "admin" && book.seller.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not allowed" });
      }

      // Build update data
      const updateData = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        price: req.body.price,
        description: req.body.description
      };

      // If new image uploaded
      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const updated = await Book.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json({
        message: "Book updated successfully",
        book: updated
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);



module.exports = router;
