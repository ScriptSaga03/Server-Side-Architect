// Module 4 - MongoDB Lab Practice
// Goal: Mastery over CRUD, Field Renaming, and Unset Operators

// Step 1: Database Setup
show dbs;
use storeDB;
db.createCollection('products');
show collections;

// Step 2: Populate Initial Products
db.products.insertMany([
    { name: "Slim Fit Cotton Shirt", price: 1299, stock: 45, category: "Men's Clothing" },
    { name: "Oversized Graphic Tee", price: 799, stock: 120, category: "Men's Clothing" },
    { name: "High-Waist Denim Jeans", price: 1999, stock: 30, category: "Women's Clothing" },
    { name: "Floral Summer Dress", price: 1499, stock: 15, category: "Women's Clothing" },
    { name: "Unisex Bomber Jacket", price: 2499, stock: 8, category: "Unisex" }
]);

// Step 3: Verify Data & Query Specific Category
db.products.find({}, {name: 1, category: 1, stock: 1, price: 1, _id: 0}).pretty();
db.products.find({category: `Women's Clothing`}, {name: 1, category: 1, _id: 0}).pretty();

// Step 4: Increase Stock of All Products by 10
db.products.updateMany({}, { $inc: { stock: 10 } });

// Step 5: Reduce Price by 5% for Products Priced Above 2000
db.products.updateMany({ price: { $gt: 2000 } }, { $mul: { price: 0.95 } });

// Step 6: Handle and Delete Out-of-Stock Items
db.products.insertMany([
    { name: "Casual Black Hoodie", price: 1599, stock: 0, category: "Men's Clothing" },
    { name: "Vintage Leather Boots", price: 3499, stock: 0, category: "Unisex" },
    { name: "Silk Wrap Skirt", price: 1199, stock: 0, category: "Women's Clothing" }
]);
db.products.find({stock: 0}, {name: 1, stock: 1, _id: 0}).pretty();
db.products.deleteMany({stock: 0});

// Step 7: Schema Refactoring (Rename & Unset)
db.products.updateMany({}, { $rename: { "category": "type" } });
db.products.updateMany({}, { $unset: { tempDiscount: "" } }); // Cleaned temp fields

// Final Check: Print Complete Refactored Collection
db.products.find({}, { _id: 0 }).pretty();
