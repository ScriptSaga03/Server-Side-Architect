// Mini Project
// User Registration

// Create DB
use userDB;

// create Collection
db.createCollection('accounts');


// insert document
db.accounts.insertMany([
    {name:'Mehtab',email:'mehtab@gmail.com', age:13, active:true},
    {name:'Shuaib',email:'shuaib@gmail.com', age:22, active:false},
    {name:'Shakib',email:'shakib@gmail.com', age:25, active:true},
    {name:'Imran',email:'imran@gmail.com', age:35, active:true},
]);


// display all accounts
db.accounts.find().pretty();

// delete one inActive account
db.accounts.deleteOne({active:false});
