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
// there are two ways to create a collection 
// method 1 
// you can create collection using the createCollection() database method
db.createCollection('students');

// method 2
// you can also create a collection during the insert process
db.students.insertOne(
    {name:'mehtab', age:24, course:'MERN Stack'}
);
show collections;

// rename collection
db.students.renameCollection('student');

// drop collection
db.student.drop();
show collections;

// drop database
db.dropDatabase();
show dbs;


