// Switch to the target database
use companyDB;

// Seed data into the employees collection
db.employees.insertMany([
  { name: "John", age: 28, role: "Developer", active: true, salary: 50000 },
  { name: "Jane", age: 32, role: "Designer", active: true, salary: 45000 },
  { name: "Mike", age: 40, role: "Manager", active: false, salary: 70000 },
  { name: "Sara", age: 25, role: "Developer", active: false, salary: 48000 },
  { name: "Bob", age: 35, role: "Designer", active: false, salary: 47000 },
  { name: "Alice", age: 30, role: "Manager", active: true, salary: 45000 },
  { name: "Lilly ", age: 32, role: "Developer", active: true, salary: 78000 }
]);



// ⚡ Challenge Tasks & Solutions
// 🔍 Querying Challenges
// Task 1: Find all active Developers under age 30
// Method 1: Implicit AND (Industry Standard - Clean & Readable)
db.employees.find(
    { active: true, role: 'Developer', age: { $lt: 30 } }, 
    { _id: 0 }
).pretty();

// Method 2: Explicit $and Operator (Useful for complex/dynamic queries)
db.employees.find(
    {
        $and: [
            { active: true },
            { age: { $lt: 30 } },
            { role: 'Developer' }
        ]
    }, 
    { _id: 0 }
).pretty();


// Task 2: Find employees with salary greater than 50000 OR role "Manager"
db.employees.find(
    {
        $or: [
            { salary: { $gt: 50000 } },
            { role: 'Manager' }
        ]
    },
    { _id: 0 }
).pretty();



// Task 3: List only names and roles of inactive employees (hide _id)
db.employees.find(
    { active: false }, 
    { name: 1, role: 1, _id: 0 }
).pretty();

// Task 4: Count how many Designers exist in the collection
// 🌟 Industry Recommended: Direct metadata scanning, faster execution
db.employees.countDocuments({ role: 'Designer' });

// Task 5: Find employees whose name starts with ‘A’ or ‘J’
JavaScript
// Standard Method: Using $or along with Regex
db.employees.find(
    {
        $or: [
            { name: { $regex: /^A/, $options: 'i' } },
            { name: { $regex: /^J/, $options: 'i' } }
        ]
    }, 
    { name: 1, _id: 0 }
).pretty();

// 🔥 Industry Pro-Tip: Short-Cut Method using Character Classes
db.employees.find(
    { name: { $regex: /^[AJ]/, $options: 'i' } }
    { name: 1, _id: 0 }
).pretty();




/*

🧠 Behind the Scenes: Deep-Dive Logic
1. The Comma (,) vs $and Operator
Comma (,): MongoDB builds an implicit AND operation automatically. It keeps the payload small and easy to read.

$and: Explicitly required only when you need to join multiple expressions on the same field name (e.g., combining multiple complex logical operators programmatically).

2. Regular Expression (Regex) Symbols Broken Down
^ (Caret Symbol): Represents "Starts with". For example, /^A/ searches for text beginning with the character 'A'. (If you wanted "Ends with", you would use the $ anchor at the end, like /a$/).

[AJ] (Character Class): Acts as an internal OR within regex. It matches any single character enclosed inside the square brackets. Therefore, /^[AJ]/ means "Starts with either A or J".

$options: 'i' (Case-Insensitive flag): Forces the database query to match both upper-case and lower-case variants (e.g., matching both Alice and alice).
*/
