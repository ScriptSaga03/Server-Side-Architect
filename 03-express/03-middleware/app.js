   

// import express
import express from 'express';

// create an express app
const app = express();

// middleware to parse json 
app.use(express.json());


// create a todo list
let todos = [
  { id: 1, title: "Learn Express Basics", completed: true },
  { id: 2, title: "Master HTTP Methods", completed: false }
];


// route to get all todos
app.get('/todos', (req, res) =>{
    res.json(todos)
});




// custom middleware ->  check admin password to delete item 
const checkAdminPassword = (req, res, next) =>{
    const { password } = req.query;
    if(password === "mehtab123"){
        next();
    } else {
        res.status(401).json({ error: "❌ Unauthorized: Invalid admin password!" });
    }

}

// http://localhost:3000/todos/1?password=mehtab123 

// delete a todo with admin password
app.delete('/todos/:id', checkAdminPassword, (req, res) =>{
    const todoId = +req.params.id;
    const todoExists = todos.find(t => t.id === todoId);

    if(!todoExists) return res.status(404).json({ error: "❌ Id not found to delete!" });

    todos = todos.filter(t => t.id !== todoId);
    res.status(200).json({ msg: `🗑️ Todo with ID ${todoId} deleted successfully` });

})






// create port 
const PORT = process.env.PORT || 3000;

// create server
app.listen(PORT , () =>{
    console.log(`express server is running on http://localhost${PORT}`);
})




