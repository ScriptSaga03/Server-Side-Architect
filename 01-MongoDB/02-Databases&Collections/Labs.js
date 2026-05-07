// Module 2
// ---------------------- Labs ---------------------- 

// create a DB called companyDB;
use companyDB;

// create three collections 
// 1) employees 2) department 3)products
db.createCollection('employees');
db.createCollection('department');
db.createCollection('products');

// list all collections
show collections;

// drop only the products collection
db.products.drop();

// drop the database companyDB
db.dropDatabase();

// recreate it again and verify empty collection list
use companyDB;
show collections;


// create another db blogDB with posts and comments collection
use blogDB;

db.createCollection('posts');
db.createCollection('comments');


// switch back to companyDB and check if blogDB still exist
use companyDB;
show dbs;



