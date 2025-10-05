import Book from '../models/Book.js';
import Review from '../models/Review.js';

export async function createBook(req, res) {
  try {
    const { title, author, description, genre, year } = req.body;
    if (!title || !author) return res.status(400).json({ message: 'Missing fields' });
    const book = await Book.create({ title, author, description, genre, year, addedBy: req.user.id });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getBooks(req, res) {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = 5;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Book.countDocuments(),
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const reviews = await Review.find({ bookId: book._id }).populate('userId', 'name');
    res.json({ ...book.toObject(), reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    const { title, author, description, genre, year } = req.body;
    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.description = description ?? book.description;
    book.genre = genre ?? book.genre;
    book.year = year ?? book.year;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await book.deleteOne();
    await Review.deleteMany({ bookId: book._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


