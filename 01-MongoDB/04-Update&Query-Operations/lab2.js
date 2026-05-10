// Array Operations


// Step 1: Check existing databases
show dbs;

// Step 2: Switch to target database (Automated creation)
use storeDB;

// Step 3: Explicitly create a collection
db.createCollection('products');

// Step 4: Verify collection creation
show collections;



// Step 5: Insert initial 5 products with stock and category
db.products.insertMany([
    {
        name: "Slim Fit Cotton Shirt",
        price: 1299,
        stock: 45,
        category: "Men's Clothing"
    },
    {
        name: "Oversized Graphic Tee",
        price: 799,
        stock: 120,
        category: "Men's Clothing"
    },
    {
        name: "High-Waist Denim Jeans",
        price: 1999,
        stock: 30,
        category: "Women's Clothing"
    },
    {
        name: "Floral Summer Dress",
        price: 1499,
        stock: 15,
        category: "Women's Clothing"
    },
    {
        name: "Unisex Bomber Jacket",
        price: 2499,
        stock: 8,
        category: "Unisex"
    }
]);

// Step 6: Verify all data using Projection (Hiding auto-generated _id)
db.products.find({}, { name: 1, category: 1, stock: 1, price: 1, _id: 0 }).pretty();

// Explanation: Agar string me quote ho, toh bahar Backticks (`) ya Double Quotes (") use karo.
db.products.find({ category: `Women's Clothing` }, { name: 1, category: 1, _id: 0 }).pretty();

// Part 2: Advanced Document Updates (Mathematical & Logical)
// Step 1: Increase stock by 10
db.products.updateMany({}, { $inc: { stock: 10 } });

// Step 2: Verify stock increase
db.products.find({}, { name: 1, stock: 1, _id: 0 }).pretty();

// Discount 5% over 2k 
// Formula: Price - 5% = Price * 0.95 (Using $mul operator)
db.products.updateMany({ price: { $gt: 2000 } }, { $mul: { price: 0.95 } });
// Verify discounted price
db.products.find({}, { name: 1, price: 1, _id: 0 }).pretty();

// Problem 6: Out-of-Stock items (Stock: 0) ko find karke safe delete karna. 
// Step 1: Temporarily insert out-of-stock items for test flow
db.products.insertMany([
    { name: "Casual Black Hoodie", price: 1599, stock: 0, category: "Men's Clothing" },
    { name: "Vintage Leather Boots", price: 3499, stock: 0, category: "Unisex" },
    { name: "Silk Wrap Skirt", price: 1199, stock: 0, category: "Women's Clothing" }
]);

// Step 2: Find all zero stock products to verify before deletion
db.products.find({ stock: 0 }, { name: 1, stock: 1, _id: 0 }).pretty();

// Step 3: Securely delete them
db.products.deleteMany({ stock: 0 });

// Problem 7: Database ka Schema badalna (Category field ko Rename karna aur Purane fields Unset karna).
// Step 1: Rename 'category' to 'type' in all documents
db.products.updateMany({}, { $rename: { "category": "type" } });

// Step 2: Remove temporary field if exists (Unset operation)
db.products.updateMany({}, { $unset: { tempField: "" } });


// 📌 Part 3: Deep Dive in Array Update Operators

// Step 1: Initialize array with '$set'
db.products.updateOne({ name: "Slim Fit Cotton Shirt" }, { $set: { tags: ["shirt", "cotton"] } });

// Step 2: Add element to array using '$push'
db.products.updateOne({ name: "Slim Fit Cotton Shirt" }, { $push: { tags: "summer" } });

// Step 3: Prevent Duplicates using '$addToSet'
db.products.updateOne({ name: "Slim Fit Cotton Shirt" }, { $addToSet: { tags: "cotton" } }); // "cotton" won't be added again!

// Step 4: Remove specific elements using '$pull'
db.products.updateOne({ name: "Slim Fit Cotton Shirt" }, { $pull: { tags: "cotton" } });

// Verify tags
db.products.find({ name: "Slim Fit Cotton Shirt" }, { name: 1, tags: 1, _id: 0 }).pretty();




// Problem 9: Single query se Update karna aur updated data ko instantly return lena.
// Step 1: Set initial array and get NEW document instantly in console
db.products.findOneAndUpdate(
    { name: 'Oversized Graphic Tee' },
    { $set: { sizes: ["S", "M", "L"] } },
    { returnDocument: 'after' } // No need to write db.find() separately!
);

// Step 2: Safely add XL size using $addToSet and return updated document
db.products.findOneAndUpdate(
    { name: "Oversized Graphic Tee" },   // 1. Filter
    { $addToSet: { sizes: "XL" } },      // 2. Update Action
    { returnDocument: 'after' }          // 3. Option (Updated data return karega)  after likhenge toh update hone ke bd ka data show krega and agr before likhenge toh update hone se pehle ka data show krega
);


// Problem 10: Array inside Array (Nested Array) creation se bachna jab bulk input add karna ho.
// Step 1: Add multiple unique sizes at once using $each modifier
db.products.updateOne(
    { name: "Oversized Graphic Tee" },
    { $addToSet: { sizes: { $each: ["XXL", "3XL", "4XL"] } } }
);

// Step 2: Final document state check
db.products.findOne({ name: "Oversized Graphic Tee" });



/*

🧠 What We Learned in This Lab (Theory & Best Practices)
1. $set vs $rename
$set: Iska use tab hota hai jab document ke andar ki Value change karni ho (e.g., password badalna).

$rename: Iska use tab hota hai jab database ka Key/Field badalna ho (e.g., database schema restructuring).

2. findOneAndUpdate & returnDocument: 'after'
By default, findOneAndUpdate console par old document print karta hai update hone se pehle ka.

{ returnDocument: 'after' } option pass karne se console par turant updated fresh document mil jata hai, jiski wajah se extra .find() query nahi chalani padti. Node.js Mongoose ke andar iske liye { new: true } ka use kiya jata hai.

3. $push vs $addToSet
$push: Array ke end mein naya data directly add kar deta hai (Yeh duplicates check nahi karta).

$addToSet: Array ko ek Set ki tarah treat karta hai aur element tabhi push karta hai jab wo list mein pehle se present na ho.

4. The Power of $each
Agar bina $each ke array as parameter pass karoge: ["XXL", "3XL"] -> toh ["S", "M", ["XXL", "3XL"]] ban jayega (Array inside Array).

Jab hum $each use karte hain, toh array ke elements de-structure ho kar flat single elements ki tarah parent array mein add hote hain: ["S", "M", "XXL", "3XL"].


/*
