// switch or create database
use storeDB;

// Insert Document
// insert one
db.product.insertOne(
    {name:'HP laptop', price:14000, category:'electronic'}
);


// insert many Documents
db.product.insertMany([
    {name:'baggy jean', price:1599, category:'cloth'},
    {name:'t-shirt', price:799, category:'cloth'}, 
]);

