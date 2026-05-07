// Lab


// create a database called storeDB;
use storeDB;

// add two collections : product and customes
db.createCollection('products');
db.createCollection('customers');


// verify both exists
show collections;

// drop the customes collection
db.customers.drop();

// list all databases again to confirm changes
show dbs 

// drop current database
db.dropDatabase();
