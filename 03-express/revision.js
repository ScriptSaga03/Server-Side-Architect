import { error } from "console";
import express from "express";
import path from "path";
import { title } from "process";
import { escape } from "querystring";
import { fileURLToPath } from "url";

// create an express app
const app = express();

// routes practice

// home page route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// html page route
app.get("/html", (req, res) => {
  res.send(
    "<h1>Welcome to the express.js Mehtab 🚀 !\nThis is an HTML page</h1>",
  );
});

// json response route
app.get("/json", (req, res) => {
  const user = {
    name: "Mehtab",
    age: 25,
    city: "New York",
  };
  res.json(user);
});

// query parameters route
app.get("/search", (req, res) => {
  const query = req.query.q;
  res.send(`You searched for: ${query}`);
});

// route parameters
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// multiple route parameters
app.get("/users/:userId/books/:bookId", (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;
  res.send(`User ID: ${userId}, Book ID: ${bookId}`);
});

// status code route
app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

// redirect route
app.get("/old-invoice", (req, res) => {
  res.redirect(301, "/download");
});

// download route
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

app.get("/download", (req, res) => {
  const filePath = path.join(__dirName, "..", "invoice.txt");
  res.download(filePath, "invoice.txt", (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

// cookie route
app.get("/cookie", (req, res) => {
  res.cookie("name", "Mehtab", { maxAge: 900000, httpOnly: true });
  res.send("Cookie has been set");
});

// response practice + response method
// json response
app.get("/response", (req, res) => {
  res.status(200).json({
    message: "This is a JSON response",
    data: {
      name: "Mehtab",
      age: 25,
      city: "New York",
    },
  });
});

// html response
app.get("/response-html", (req, res) => {
  res.status(200).send("<h1>This is an HTML response</h1>");
});

// download response;
app.get("/response-download", (req, res) => {
  const filePath = path.join(__dirname, "invoice.txt");
  res.download(filePath, "invoice.txt", (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

// redirect response
app.get("/response-redirect", (req, res) => {
  res.redirect(301, "/response");
});

// set cookie response
app.get("/response-cookie", (req, res) => {
  res.cookie("name", "Mehtab", { maxAge: 900000, httpOnly: true });
  res.send("Cookie has been set in response");
});

// clear cookie response
app.get("/response-clear-cookie", (req, res) => {
  res.clearCookie("name");
  res.send("Cookie has been cleared in response");
});

// headers response
app.get("/response-header", (req, res) => {
  res.set("Custom-Header", "This is a custom header");
  res.send("Custom header has been set in response");
});

// status code response
app.get("/response-status", (req, res) => {
  res.status(404).send("Not Found");
});

// send response
app.get("/response-send", (req, res) => {
  res.send("This is a plain text response");
});

// sendFile response
app.get("/response-sendfile", (req, res) => {
  const filePath = path.join(__dirName, "..", "invoice.txt");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error sending file");
    }
  });
});

// end response
app.get("/response-end", (req, res) => {
  res.end("This is the end of the response");
});

// request practice and it's methods
app.get("/request", (req, res) => {
  const method = req.method;
  const url = req.url;
  const headers = req.headers;
  const query = req.query;
  const params = req.params;

  res.json({
    method,
    url,
    headers,
    query,
    params,
  });
});

app.get("/request-headers", (req, res) => {
  const headers = req.headers;
  res.json(headers);
});

app.get("/request-query", (req, res) => {
  const query = req.query;
  res.json(query);
});

app.get("/request-params/:id", (req, res) => {
  const params = req.params;
  res.json(params);
});

app.get("/request-body", (req, res) => {
  const body = req.body;
  res.json(body);
});

app.get("/request-cookies", (req, res) => {
  const cookies = req.cookies;
  res.json(cookies);
});

app.get("/request-ip", (req, res) => {
  const ip = req.ip;
  res.json({ ip });
});

app.get("/request-protocol", (req, res) => {
  const protocol = req.protocol;
  res.json({ protocol });
});

app.get("/request-host", (req, res) => {
  const host = req.get("host");
  res.json({ host });
});

app.get("/request-user-agent", (req, res) => {
  const userAgent = req.get("user-agent");
  res.json({ userAgent });
});

app.get("/request-accepts", (req, res) => {
  const accepts = req.accepts();
  res.json({ accepts });
});

app.get("/request-accepts-language", (req, res) => {
  const acceptsLanguage = req.acceptsLanguages();
  res.json({ acceptsLanguage });
});

app.get("/request-accepts-encoding", (req, res) => {
  const acceptsEncoding = req.acceptsEncodings();
  res.json({ acceptsEncoding });
});

app.get("/request-accepts-type", (req, res) => {
  const acceptsType = req.acceptsTypes();
  res.json({ acceptsType });
});

app.get("/request-accepts-charsets", (req, res) => {
  const acceptsCharsets = req.acceptsCharsets();
  res.json({ acceptsCharsets });
});

// crud app + library management
// library management system dataset almost 20+ problems
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
];

// read all books
app.get("/books", (req, res) => {
  res.json(books);
});

// smart search
// app.get('/books/search', (req, res) => {

//     const { id, title, author } = req.query;

//     const result = books.filter(b =>
//         (id && b.id === +id) ||
//         (title && b.title.toLowerCase().includes(title.toLowerCase())) ||
//         (author && b.author.toLowerCase().includes(author.toLowerCase()))
//     );

//     if(result.length === 0)
//         return res.status(404).json({
//             error: "❌ result not found!"
//         });

//     return res.status(200).json({
//         message: "✅ books found successfully",
//         books: result
//     });
// });

// read a book by id
app.get("/books/id/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((b) => b.id === +bookId);
  if (!book) return res.status(404).json({ error: "❌ Book not found!" });
  return res.status(200).json({ message: "✅ Book found successfully", book });
});

// total books count
app.get("/books/total", (req, res) => {
  const totalBooks = books.length;
  if (totalBooks === 0)
    return res.status(404).json({ error: "❌ No books found!" });
  return res
    .status(200)
    .json({
      message: "✅ Total books count retrieved successfully",
      totalBooks,
    });
});

// search by title
// app.get('/books/search/title', (req, res) => {
//     const title = req.query.title;
//     const filteredBooks = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
//     if(filteredBooks.length === 0) return res.status(404).json({ error: "❌ No books found with the given title!" });
//     return res.status(200).json({ message: "✅ Books found successfully", books: filteredBooks });
// });

// search by author
// app.get('/books/search/author', (req, res) => {
//     const author = req.query.author;
//     const filteredBooks = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
//     if(filteredBooks.length === 0) return res.status(404).json({ error: "❌ No books found with the given author!" });
//     return res.status(200).json({ message: "✅ Books found successfully", books: filteredBooks });
// });

// sorted books by title
app.get("/books/sorted/title", (req, res) => {
  const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
  if (sortedBooks.length === 0)
    return res.status(404).json({ error: "❌ No books found to sort!" });
  return res
    .status(200)
    .json({
      message: "✅ Books sorted by title successfully",
      books: sortedBooks,
    });
});

// first book
app.get("/books/first", (req, res) => {
  if (books.length === 0)
    return res.status(404).json({ error: "❌ No books found!" });
  return res
    .status(200)
    .json({ message: "✅ First book retrieved successfully", book: books[0] });
});

// last book
app.get("/books/last", (req, res) => {
  if (books.length === 0)
    return res.status(404).json({ error: "❌ No books found!" });
  return res
    .status(200)
    .json({
      message: "✅ Last book retrieved successfully",
      book: books[books.length - 1],
    });
});

// random book
app.get("/books/random", (req, res) => {
  if (books.length === 0)
    return res.status(404).json({ error: "❌ No books found!" });
  const randomIndex = Math.floor(Math.random() * books.length);
  return res
    .status(200)
    .json({
      message: "✅ Random book retrieved successfully",
      book: books[randomIndex],
    });
});

// search by partial title
app.get("/books/search/title", (req, res) => {
  const q = req.query.title;
  if (!q)
    return res.status(400).json({
      error: "Please provide title",
    });

  const result = books.filter((b) =>
    b.title.toLowerCase().includes(q.toLowerCase()),
  );

  if (result.length === 0)
    return res
      .status(404)
      .json({ error: "❌ no book found by specific title!" });
  return res
    .status(200)
    .json({ message: `✅ ${q} found successfully`, books: result });
});

// search book by partial author
app.get("/books/search/author", (req, res) => {
  const q = req.query.author;

  if (!q)
    return res.status(400).json({
      error: "Please provide author",
    });

  const result = books.filter((b) =>
    b.author.toLowerCase().includes(q.toLowerCase()),
  );

  if (result.length === 0)
    return res
      .status(404)
      .json({ error: "❌ no book found by specific author!" });
  return res
    .status(200)
    .json({ message: `✅ ${q} found successfully`, books: result });
});

// titles of all books
app.get("/books/titles", (req, res) => {
  const titles = books.map((b) => b.title);
  if (titles.length === 0)
    return res.status(404).json({ error: "❌ No books found!" });
  return res
    .status(200)
    .json({ message: "✅ Titles of all books retrieved successfully", titles });
});

// author of all books
app.get("/books/authors", (req, res) => {
  if (books.length === 0 || !books)
    return res.status(400).json({ error: "❌ Books not available!" });
  const authors = books.map((b) => b.author);
  if (authors.length === 0)
    return res.status(400).json({ error: `❌authors not available!` });
  return res
    .status(200)
    .json({
      message: "✅ Titles of all books retrieved successfully",
      authors,
    });
});

// books exist
app.get("/books/exist", (req, res) => {
  const title = req.query.title;

  if (!title)
    return res.status(400).json({
      error: "❌ Please provide title",
    });

  const isExist = books.some((b) =>
    b.title.toLowerCase().includes(title.toLowerCase()),
  );

  return res.status(200).json({
    title,
    isExist,
  });
});



// middleware to parse json
app.use(express.json());

// add new book Post method
app.post('/books',(req, res) =>{
    const {title, author} = req.body;
    if(!title && author)  return res.status(400).json({error:'❌ please provide title and author'})
    let newBook= {
        id: books.length +1,
        title:title,
        author:author
    };

    books.push(newBook);
    return res.status(201).json({message:`✅ new book added successfully`, books})

});



// smart delete
app.delete('/books/delete/:id', (req, res) =>{
    const q = req.params.id;
    let isExist = books.find(b => b.id === q);
    if(!isExist) return res.status(404).json({ error: "❌ Id not found to delete!" });

    books = books.filter(b => b.id !== isExist);
   res.status(200).json({ msg: `🗑️ Todo with ID ${todoId} deleted successfully` , books});
});




// middleware custom middleware + application level middleware

// logic building 25+ problems

// problem solving 25+ problems

// 1

// PORT
const PORT = process.env.PORT || 3000;

// listen to the server
app.listen(PORT, () => {
  console.log(`🚀 express server is running on port http://localhost:${PORT}`);
});
