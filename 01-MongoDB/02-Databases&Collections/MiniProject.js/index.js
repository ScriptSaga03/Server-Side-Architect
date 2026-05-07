// create a db inventoryDB
use inventoryDB;

// add collections
db.createCollection('products');
db.createCollection('suppliers');
db.createCollection('sales');

// confirm collections exist
show collections;


// drop sales collections
db.sales.drop();
show collections;

// Recreate it again 
db.createCollection('sales');
