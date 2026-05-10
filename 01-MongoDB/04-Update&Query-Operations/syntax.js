/*🧠 Theory (Short & Clear)
Querying: Select documents based on specific criteria.
Updating: Change one or many fields in documents.
MongoDB uses operators like $set, $inc, $rename, $unset, $gt, $lt, $in to modify or filter data.
Analogy: Think of your database as a spreadsheet — querying is “finding the rows that match conditions,” updating is “editing specific cells.”
*/


// Query Operators (Filters)
db.collection.find({ age: { $gt: 18 } })      // greater than 18
db.collection.find({ age: { $lt: 30 } })      // less than 30
db.collection.find({ name: "Alice" })        // exact match
db.collection.find({ age: { $in: [18, 25, 30] } }) // matches any value in array

// Update Operators
// Update one document
db.collection.updateOne({ name: "Alice" }, { $set: { active: false } })

// Update many documents
db.collection.updateMany({ active: false }, { $set: { active: true } })

// Increment a field
db.collection.updateOne({ name: "Alice" }, { $inc: { age: 1 } })

// Rename a field
db.collection.updateMany({}, { $rename: { "oldName": "newName" } })

// Remove a field
db.collection.updateOne({ name: "Alice" }, { $unset: { tempField: "" } })



// Find & Project Specific Fields
db.collection.find({ age: { $gt: 18 } }, { name: 1, age: 1, _id: 0 })
