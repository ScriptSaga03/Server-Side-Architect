   

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

// add a new todo
app.post('/todos', (req, res) =>{
    const {title} = req.body;

    if(!title) return res.status(400, ({error: 'title not found!'}));


    const newTodo = {
        id: todos.length + 1,
        title : title,
        completed:false
    };

    todos.push(newTodo);
    res.status(201).json({ msg: "🚀 Todo successfully added!", data: newTodo });
})



// update todo 
app.put('/todos/update/:id', (req, res) =>{
    const todoId = +req.params.id;
    const { completed, title } = req.body;

    const isExist = todos.find(t => t.id === todoId);

    if(!isExist) return res.status(400, ({error: `❌${todoId} not found!`}));

   if (title !== undefined) isExist.title = title;
   if (completed !== undefined) isExist.completed = completed;

   res.status(200).json({ msg: "🔄 Todo updated successfully", data: isExist }); /
})



// 3. DELETE - Remove a todo
app.delete('/api/todos/:id', (req, res) => {
    const todoId = +req.params.id;

    const todoExists = todos.find(t => t.id === todoId);
    if (!todoExists) {
        return res.status(404).json({ error: "❌ Id not found to delete!" });
    }

    todos = todos.filter(t => t.id !== todoId);

    res.status(200).json({ msg: `🗑️ Todo with ID ${todoId} deleted successfully` });
});




// create port 
const PORT = process.env.PORT || 3000;

// create server
app.listen(PORT , () =>{
    console.log(`express server is running on http://localhost${PORT}`);
})




