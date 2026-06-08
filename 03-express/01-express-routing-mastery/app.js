// import express
import express from 'express';


// app 
const app = express();


// routes

// home page + html response 
app.get('/', (req, res)=> {
    res.send(`<h1>Welcome to Express.js, Mehtab 🚀</h1><p>This is a HTML Response</p>`)
});

// api user (Request for JSON )  -->
app.get('/api/user', (req, res) => {
    const user = {
         name: 'Mehtab',
         age: 30,
         email: 'mehtab.dev@example.com'
    };
    res.json(user);
});


// user route with path parameters (single params)
app.get('/user/:id', (req, res) =>{
    const userId = req.params.id;
    res.send(`<h2>User Id: ${userId} </h2>`)
});



// multiple params
app.get('/user/:id/:name', (req, res) =>{
    const userId = req.params.id;
    const userName = req.params.name;
    res.send(`<h2>User Id: ${userId} <br> User Name: ${userName} </h2>`)
});


// search route with query parameters
app.get('/search', (req, res) =>{
    const query = req.query.q;
    res.send(`search : ${query}`)
});






// PORT
const PORT = process.env.PORT || 3000;


// Server
app.listen(PORT, () =>{
    console.log(`express server is running on http://localhost:${PORT}`);
})
