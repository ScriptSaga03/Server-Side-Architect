

import express from 'express';

// create an express app
const app  = express();


// Global Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// data
const users = [
  {
    "id": 1,
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "password": "123456"
  },
  {
    "id": 2,
    "name": "Priya Verma",
    "email": "priya@gmail.com",
    "password": "password123"
  }
]

// create custom error
const createCustomError  = (statusCode, message) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.success = false;
    return err
}





// Route mounting
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});
app.post('/api/register', (req, res, next) => {
    try {
        const {userName, email, password, age} = req.body;

        //  validation logic
        if(!req.body ||  Object.keys(req.body).length === 0){
            throw createCustomError(400, '⚠ Request body cannot be empty!')
        }

        // 2 Mission values
        if(!userName || !email || !password){
            throw createCustomError(400, '⚠ Bad Request : All fields are required!')
        }

        if(!age || age < 18){
            throw createCustomError(400, `⚠ User must be 18 years old!`)
        }

      const newUser = {
      id: users.length + 1,
      name: userName,
      email,
      password,
      age
    };

    // 4. Send Success Response (No next() after res.json)
    return res.status(201).json({
      success: true,
      message: '✔ User registered successfully.',
      data: {
        userName,
        email,
        age
      }
    });

        users.push(newUser)

       // 4. Send Success Response (No next() after res.json)
    return res.status(201).json({
      success: true,
      message: '✔ User registered successfully.',
      data: {
        userName, 
        email,
        age
      }
    });

    } catch (error) {
        next(error)
    }
})




// if route not found 
app.use((req, res, next) => {
    // const err = new Error(`❌ Can't find ${req.originalUrl}  on this server!`);
    // err.statusCode = 404;
    // next(err)
    const err = createCustomError(404, `Can't find ${req.originalUrl} on this server!`);
    next(err);
})

// Centralized Error
const errorHandler = (err, req, res, next) =>{
    const message = err.message || `❌Internal Server Error!`;
    const statusCode = err.statusCode || err.status || 500;
    return res.status(statusCode).json({
        success:false,
        status:'Error',
        statusCode,
        message
    })
};

app.use(errorHandler)

// Create PORT 
const PORT = process.env.PORT || 3000;
// start server listening 
app.listen(PORT, () => {
    console.log(`🚀 Express server is running on PORT : http://localhost:${PORT}`)
});