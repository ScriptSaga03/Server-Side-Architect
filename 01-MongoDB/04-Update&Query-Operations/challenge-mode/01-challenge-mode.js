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



// ⚡ Update Tasks & Production Solutions

// Task 1: Increase salary of all Developers by 10%
// Formula: Current Salary * 1.10 = 10% Increase
db.employees.updateMany(
    { role: 'Developer' }, 
    { $mul: { salary: 1.10 } }
);


// Task 2: Set active: true for all inactive employees younger than 40
// Step 1: Verify matching records before updating
db.employees.find({ active: false, age: { $lt: 40 } }, { _id: 0 }).pretty();

// Step 2: Execute bulk update
db.employees.updateMany(
    { active: false, age: { $lt: 40 } }, 
    { $set: { active: true } }
);

// Step 3: Re-verify to ensure no matching records remain inactive
db.employees.find({ active: false, age: { $lt: 40 } }, { _id: 0 }).pretty();


// Task 3: Increment age by 1 for employees earning more than 50,000
db.employees.updateMany(
    { salary: { $gt: 50000 } }, 
    { $inc: { age: 1 } }
);

// Task 4: Remove the salary field from employees who are inactive
db.employees.updateMany(
    { active: false }, 
    { $unset: { salary: "" } }
);


// Task 5: Rename the field role → position for everyone
db.employees.updateMany(
    {}, 
    { $rename: { 'role': 'position' } }
);



/*
🧠 Core Operator Definitions (For your Git Notes)
$set: Field ki value ko badalta hai. Agar field document mein nahi hai, toh yeh naya field create kar deta hai.
$inc: Kisi number field ko plus ya minus karne ke liye use hota hai. (e.g., { $inc: { age: -1 } } karne se age ek saal kam ho jayegi).
$mul: Database level par direct multiplication karta hai. Percentage calculations ya currency updates ke liye best operator hai.
$unset: Kisi field ko value ke sath hi schema se delete kar deta hai. Field ko empty string "" pass karke execute kiya jata hai.
$rename: Pura ka pura column/field name change kar deta hai bina values ko touch kiye.
*/



// ⚡ Delete Tasks & Production Solutions
// Task 1: Delete one employee whose name is “Bob”
// Method 1: Standard Deletion (Recommended when response payload isn't needed)
db.employees.deleteOne({ name: "Bob" });

// Method 2: Delete and fetch the deleted document state (Using 'before' to see what was deleted)
db.employees.findOneAndDelete({ name: "Bob" }, { returnDocument: "before" });

// Step 2: Verification check (Should return empty/no output)
db.employees.find({ name: "Bob" });



// Task 2: Delete all inactive employees
// Step 1: Check how many inactive employees exist before deletion
db.employees.find({ active: false }).pretty();

// Step 2: Perform bulk delete
db.employees.deleteMany({ active: false });

// Step 3: Re-verify to ensure the operation was successful
db.employees.find({ active: false });



// ⚡ Advanced Tasks & Production Solutions
// Task 2: Find the highest-paid employee under 35 years old
db.employees.find(
    { age: { $lt: 35 } } // Filter: Age under 35
)
.sort({ salary: -1 })    // Sort: Salary High to Low (-1 means Descending)
.limit(1);               // Limit: Pick only the top 1 highest-paid person


// Task 3: List all employees sorted by age descending, showing only name and age
db.employees.find(
    {},                           // Empty filter means select ALL employees
    { name: 1, age: 1, _id: 0 }   // Projection: Show only name and age, hide _id
)
.sort({ age: -1 });


/*
sort({ field: 1 / -1 }): Database level par sorting karne ke liye. 1 ka matlab hai Ascending (A to Z, 1 to 10) aur -1 ka matlab hai Descending (Z to A, 10 to 1).

limit(n): Yeh query response ke total documents ko restrict kar deta hai. Agar limit(5) likha hai, toh database sirf pehle 5 documents hi return karega, jo pagination mein bohot kaam aata hai.
*/




