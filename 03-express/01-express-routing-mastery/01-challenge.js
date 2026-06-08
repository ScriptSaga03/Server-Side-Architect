/*
🛑 Problem 1: The Product Filter (Array Filtering)
Route: /api/products
Logic: Ek products ka dummy array banao. Agar koi simple /api/products par jaye, 
toh saare products res.json() kar do. Lekin agar koi /api/products?category=electronics hit kare, 
toh array ko filter karke sirf electronics wale bhejni hai.

*/



const products = [
  { id: 1, name: "Laptop", category: "electronics" },
  { id: 2, name: "T-Shirt", category: "clothing" },
  { id: 3, name: "Mobile", category: "electronics" }
];



import express from 'express';

const app = express();


// Home Page
app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1>`)
});

// products
app.get('/products', (req, res) => {
    res.json(products);
});

// search products by category
app.get('/products/search', (req, res) => {
    const category = req.query.category;
    const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    res.json(filteredProducts);
});


// server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})


