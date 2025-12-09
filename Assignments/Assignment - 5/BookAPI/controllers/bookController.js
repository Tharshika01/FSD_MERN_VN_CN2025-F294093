const Book = require("../models/book");

// Create
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
};

// Get all
exports.getAllBooks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;

    const books = await Book.find(filter).sort({ publishedYear: 1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Get by ID
exports.getBookById = async (req, res) => {
  try {
    const b = await Book.findById(req.params.id);
    if (!b) return res.status(404).json({ message: "Not found" });
    res.json(b);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Update
exports.updateBookById = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Delete
exports.deleteBookById = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Book deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};
