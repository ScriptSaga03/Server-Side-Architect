

// Todo App 

// import express
import express from 'express';

// create an express app
const app = express();  


// create a todo list
let todoList = [];

// middleware to parse JSON
app.use(express.json());

// route to get all todos
app.get('/todos', (req, res) => {
    res.json(todoList);
});

// route to add a new todo
app.post('/todos', (req, res) => {
    const { title } = req.body; 
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }   
    const newTodo = { id: Date.now(), title };
    todoList.push(newTodo);
    res.status(201).json(newTodo);
});


// route to delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todoList.findIndex((todo) => todo.id === parseInt(id));
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todoList.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted successfully' });
});


// update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const todoIndex = todoList.findIndex((todo) => todo.id === parseInt(id));
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todoList[todoIndex].title = title;
    res.json(todoList[todoIndex]);
});

// route to mark a todo as completed
app.patch('/todos/:id/complete', (req, res) => {
    const { id } = req.params;
    const todoIndex = todoList.findIndex((todo) => todo.id === parseInt(id));
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todoList[todoIndex].completed = true;
    res.json(todoList[todoIndex]);
});



// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



