//  Start Mongo shell (once MongoDB installed)
mongosh

// Show all databases

// method one
 show dbs;
// method two
// show databases;

// create or switch databases
use myDatabase;

// If you want to check that your database created or not
show dbs;


// show all collection in current DB
show collections;

// create collections
db.createCollection('students');

show collections;

// drop collection
db.students.drop();

show collections

// # Drop database

db.dropDatabase();

show dbs;


