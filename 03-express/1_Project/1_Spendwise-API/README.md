🚀 Spendwise API


A secure, scalable RESTful API built with Node.js, Express, and MongoDB to track daily expenses, manage user authentication, and handle role-based authorization seamlessly.

✨ Features
User Authentication & Authorization: Secure registration and login using JWT and bcryptjs.

Role-Based Access Control (RBAC): Fine-grained permissions for regular users (user) and admins (admin).

Expense Management: Complete CRUD operations for logging, updating, fetching, and deleting expenses.

Atomic Database Operations: Supports advanced MongoDB operators like $inc, $unset, $addToSet, and $pull for efficient updates.

Custom Middleware Pipeline: Integrated centralized error handling, custom logger using Winston & Morgan, request timing, and secure HTTP headers via Helmet.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Security: JSON Web Token (JWT), Bcrypt.js, Helmet

Logging: Winston, Morgan

📂 Project Structure
Plaintext
├── src/
│   ├── config/          # Database configuration
│   ├── controller/      # Business logic for auth & expenses
│   ├── helper/          # Token generation & Winston logger
│   ├── middleware/      # Auth, RBAC, Morgan, & Error middlewares
│   ├── model/           # Mongoose schemas (User & Expense)
│   ├── router/          # Express route definitions
│   └── utils/           # Custom error helpers & async handlers
├── .env                 # Environment variables
└── app.js               # Express application entry point


🔗 API Endpoints Summary
Auth Routes (/api/v1/auth)
POST /register – Register a new user

POST /login – Authenticate user and receive JWT token

Expense Routes (/api/v1/expenses)
GET / – Fetch all user expenses (Protected)

POST / – Create a new expense (Protected)

GET /:id – Get expense by ID (Protected)

PATCH /:id – Update expense (Protected)

DELETE /:id – Delete expense (Protected)

PATCH /atomic/:id – Apply atomic MongoDB field updates (Protected)
