const Book = require("../models/Book");

// GET all books (supports optional search by title, author, genre)
exports.getBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    let query = {};

    if (title) query.title = new RegExp(title, "i"); // case-insensitive
    if (author) query.author = new RegExp(author, "i");
    if (genre) query.genre = new RegExp(genre, "i");

    const books = await Book.find(query);

    if (!books.length) return res.status(404).json({ message: "No books found" });

    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ADD a new book (seller or admin only)
exports.addBook = async (req, res) => {
  try {
    const newBook = await Book.create({ ...req.body, seller: req.user.id });
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE a book (seller or admin only)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
