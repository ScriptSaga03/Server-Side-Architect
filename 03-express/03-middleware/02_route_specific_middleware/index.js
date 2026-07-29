import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

// In-Memory Data
let users = [
    { id: 1, name: "Mehtab", role: "admin", age: 24 },
    { id: 2, name: "Rahul", role: "developer", age: 22 }
];


// ==========================================
// 🛡️ 1. ROUTE-LEVEL MIDDLEWARES (GUARDS)
// ==========================================

// GUARD 1: API Key Checker
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== 'secret123') {
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized: Invalid or missing X-API-KEY header!'
        });
    }

    next(); // Key sahi hai, route par jaane do!
};

// GUARD 2: Admin Role Checker
const checkAdmin = (req, res, next) => {
    // Standard Headers lowercase mein parse hote hain
    const userRole = req.headers['x-user-role']; 

    if (userRole !== 'admin') {
        return res.status(403).json({
            status: 'fail',
            message: 'Forbidden: Sirf Admin ko user delete karne ki permission hai!'
        });
    }

    next(); // Admin hai, action allow karo!
};

// GUARD 3: Body Input Validator
const validateCreateUser = (req, res, next) => {
    const { name, role, age } = req.body;

    if (!name || !role || age === undefined) {
        return res.status(400).json({
            status: 'fail',
            message: 'Validation Error: name, role, aur age sabhi required hain!'
        });
    }

    if (age < 18) {
        return res.status(400).json({
            status: 'fail',
            message: 'Validation Error: User ki age minimum 18 honi chahiye!'
        });
    }

    next(); // Data ekdum perfect hai!
};


// ==========================================
// 🛣️ 2. ROUTES WITH SPECIFIC MIDDLEWARES
// ==========================================

// Public Route (No Guards)
app.get('/api/public', (req, res) => {
    res.json({ message: "Yeh public route hai, koi bhi access kar sakta hai." });
});

// Protected Route 1: Requires API Key
app.get('/api/dashboard', checkApiKey, (req, res) => {
    res.json({ status: "success", message: "Welcome to Secret Dashboard!" });
});

// Protected Route 2: Requires Both Validation & API Key (Multiple Guards Chain)
app.post('/api/users', checkApiKey, validateCreateUser, (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json({ status: "success", data: newUser });
});

// Protected Route 3: Admin Only Route
app.delete('/api/users/:id', checkApiKey, checkAdmin, (req, res) => {
    const id = +req.params.id;
    users = users.filter(u => u.id !== id);
    res.json({ status: "success", message: `User ID ${id} deleted by Admin!` });
});


// Centralized Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
