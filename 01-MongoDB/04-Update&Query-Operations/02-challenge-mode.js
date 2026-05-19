show dbs;


use companyDB;


db.createCollection('employees');


db.employees.insertMany([
    { name:"John", age:28, position:"Developer", active:true, salary:50000, skills:["JavaScript","MongoDB"], projects:[{name:"App1",status:"done"},{name:"App2",status:"ongoing"}] },
  { name:"Jane", age:32, position:"Designer", active:true, salary:45000, skills:["Photoshop","Illustrator"], projects:[{name:"BrandX",status:"done"}] },
  { name:"Mike", age:40, position:"Manager", active:false, salary:70000, skills:["Leadership","Planning"], projects:[{name:"ProjectA",status:"done"}] },
  { name:"Sara", age:25, position:"Developer", active:true, salary:48000, skills:["JavaScript","React"], projects:[{name:"App3",status:"ongoing"}] },
  { name:"Bob", age:35, position:"Designer", active:false, salary:47000, skills:["Figma"], projects:[{name:"BrandY",status:"ongoing"}] },
  { name:"Alice", age:30, position:"Manager", active:true, salary:68000, skills:["Leadership","MongoDB"], projects:[{name:"ProjectB",status:"ongoing"}] },
    { name:"Nobita", age:29, position:"Developer", active:false, salary:47000, skills:["Figma"], projects:[{name:"BrandY",status:"ongoing"}] },
    { name:"Suzuka", age:33, position:"Developer", active:true, salary:44000, skills:["React"], projects:[{name:"BrandX",status:"done"}] },
]);


// ⚡ Advanced Challenge Tasks
// Array & Nested Document Queries

// Find all employees who have "MongoDB" in their skills array
db.employees.find({skills: 'MongoDB'}, {_id:0, name:1, skills:1}).pretty();

// Find employees working on a project with status "ongoing".

// Definition: Using Dot Notation ("projects.status") to traverse the array of objects and filter documents where at least one nested object contains a status of "ongoing".
db.employees.find({
    "projects.status": "ongoing"
}, {_id:0, name:1, projects:1});



// List all employees who have both “JavaScript” and “React” skills.
db.employees.find({
    skills: {$all: ["JavaScript", "React"]}
}, {_id:0, name:1, skills:1});



// Find employees who have more than 1 project.
db.employees.find({   
    projects: {$size: 1}   
  // yeh mujhe un employees ka data return krega jinke paas exactly 1 hi project ho na 1 se km aur na 1 se jyada  yeh hum gt jese operator se nhi kr skte jb hame array ki length check krni ho ya array object ki length toh hum size ka use krte hai 
}, {_id:0, name:1, projects:1}).pretty();

db.employees.find({
    $expr: { 
        $gt: [ { $size: "$projects" },1 ] 
      // expr se hum 2 ya 2 se jyada field ko compare kr skte hai math and logics lga skte hai 
      // jb bhi hum expr mai koi operator use krenge uske aage hum [] ka use krenge and jb bhi hum kisi field ka naam expr ke ander likhenge toh uske aage $ ka sign lagaenge
    }
}, {_id:0, name:1, projects:1}).pretty();


 // *********************************************************************************************************


// Combined Operators


// Find active Developers with salary > 45000 and age < 30.
db.employees.find({
    position:'Developer',
    active:true,
    salary : {$gt: 45000},
    age : {$lt: 30}
}, {_id:0, name:1, salary:1, age:1}).pretty();


// Find employees whose name starts with "J" or who are Managers.
db.employees.find({
    $or: [
       { position:'Manager'},
        { name: { $regex: /^J/, $options: 'i' } }
    ]
}, {_id:0, name:1, position:1}).pretty();



// Find employees with skills containing "Leadership" but not active.
db.employees.find({
    active:false,
    skills: "Leadership"
},{_id:0}).pretty();
