// start mongoDB after installation
mongosh


// show databases
// method 1
// show dbs;
// method 2
show databases;


// switch or create databases
use mySchool;
show dbs;

// mongoDB is lazy-loading by design, It won't actually save or show database in show dbs  until some data exists inside (a collection or a document).

// show collection
show collections

// create collection 
db.createCollection('students');
show collections;

// rename collection
db.students.renameCollection('student');

// drop collection
db.student.drop();
show collections;

// drop database
db.dropDatabase();
show dbs;


