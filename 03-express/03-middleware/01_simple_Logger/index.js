
let users = [
    { id: 1, name: "Mehtab", role: "Developer" },
    { id: 2, name: "Rahul", role: "Designer" },
    { id: 3, name: "Aman", role: "Manager" }
];

import express from 'express';
import morgan  from 'morgan';
import helmet from 'helmet'


// create an express app
const app = express();

// app.use(helmet());
// app.use(morgan('dev'))


// create PORT 
const PORT = process.env.PORT || 3000;
// Build in MIDDLEWARE 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// Custom Application Level Middleware
// simple logger 
app.use((req, res, next) =>{
    req.requestTime = new Date().toLocaleTimeString();
    console.log(`📡 [LOG]: ${req.method} request received at ${req.url} | Time: ${req.requestTime}`);
   next();
})




// simple routes
app.get('/api/users',(req, res, next) =>{
   try {
        return res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            total: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/users/search', (req, res, next) => {
    try {
        const queryKeys = Object.keys(req.query);

        // Agar koi query parameter hi nahi diya (`/api/users/search`)
        if (queryKeys.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "No query parameters provided, returning all users.",
                total: users.length,
                data: users
            });
        }

        // Dynamic Filtering: Har query key ko check karo
        const result = users.filter(user => {
            return queryKeys.every(key => {
                if (!user[key]) return false;
                return user[key].toString().toLowerCase() === req.query[key].trim().toLowerCase();
            });
        });

        if (result.length > 0) {
            return res.status(200).json({
                status: "success", 
                totalFound: result.length, 
                data: result
            });
        } else {
            return res.status(404).json({
                status: 'fail', 
                message: "No user found matching search query!"
            });
        }

    } catch (error) {
        next(error);
    }
});



// centralized  error handler
app.use((err, req, res, next) =>{
    return res.status(err.statusCode || 500).json({
        status:'error',
        message:err.message || 'Internal Server Error'
    })
})

// start server listen 
app.listen(PORT , ()=>{
    console.log(`server is runnint on PORT http://localhost:${PORT}`);
});
