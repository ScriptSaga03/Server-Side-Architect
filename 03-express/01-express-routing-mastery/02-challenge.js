
/*



🆔 Problem 2: User Profile Finder (Error Handling with 404)
Route: /api/users/:id
Logic: req.params.id se ID nikalo. Use niche diye gaye array mein dhoondo (.find() use kar sakte ho).
Agar user mil jaye, toh use res.status(200).json(user) bhej do. Agar user na mile (jaise kisi ne ID 99 mang li), 
toh res.status(404).json({ error: "User nahi mila bhai!" }) bhejna hai.

*/

const users = [
  { id: 1, name: "Mehtab", role: "Backend Dev" },
  { id: 2, name: "Rahul", role: "Frontend Dev" }
];



import express from 'express';

const app = express();


// Home Page
app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1>`)
});


// problem 2 user profile finder
app.get("/api/user/:id", (req, res) =>{
    const userId = req.params.id;
    const isExist = users.find(u => u.id === +userId);

   isExist 
      ? res.status(200).json({ msg: "✅ user found successfully", user: isExist })
      : res.status(404).json({ error: "❌ user not found!" });
})






// server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})


