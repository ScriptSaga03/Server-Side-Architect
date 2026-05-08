// Module 3
//  -------------- Lab --------------


// create libraryDB -> collection :books
use libraryDB;
db.createCollection('books');


// Inserting 3 books into the 'books' collection
db.books.insertMany([
    {
        title: "Mastering Node.js",
        author: "Ryan Dahl",
        price: 599,
        available: true
    },
    {
        title: "MongoDB: The Definitive Guide",
        author: "Shannon Bradshaw",
        price: 850,
        available: true
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 450,
        available: false
    }
]);

// view all documents
db.books.find();

// insert 2 more books using insert one
// Inserting the 4th book
db.books.insertOne({
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    price: 720,
    available: true
});

// Inserting the 5th book
db.books.insertOne({
    title: "Pragmatic Programmer",
    author: "Andrew Hunt",
    price: 900,
    available: false
});


db.books.find().pretty();


// view the first book only 
db.books.findOne();


// delete one specific book by title
db.books.deleteOne({
    title:'Clean Code',
});

// find book by title
db.books.find({title:'Clean Code'}).pretty();
db.books.find().pretty();

// delete all books
db.books.deleteMany({});

// verify the collection is empty 
db.books.find().pretty();






