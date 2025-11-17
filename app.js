const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// In-memory list of books
let books = [
    { id: 1, title: "Harry Potter", author: "J.K.Rowling" },
    { id: 2, title: "The Power Of Subconscious Mind", author: "Joseph Murphy" }
];

// -----------------------------
// 👉 GET all books
// -----------------------------
app.get('/books', (req, res) => {
    res.json(books);
});

// -----------------------------
// 👉 GET a single book by ID
// -----------------------------
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// -----------------------------
// 👉 POST: Add a new book
// -----------------------------
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// -----------------------------
// 👉 PUT: Update a book by ID
// -----------------------------
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});

// -----------------------------
// 👉 DELETE: Remove a book by ID
// -----------------------------
app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
