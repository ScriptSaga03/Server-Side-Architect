🚀 Spendwise API


A secure, scalable RESTful API built with Node.js, Express, and MongoDB to track daily expenses, manage user authentication, and handle role-based authorization seamlessly.

## 🚀 Features

* **Authentication & Authorization**: Secure JWT-based auth with hashed passwords (`bcryptjs`) and role-based access control (`user` vs `admin`).
* **Expense Management**: Complete CRUD operations for expenses tied to specific users.
* **Security Guardrails**:
  * Request header validation & ownership checks for data privacy.
  * Express `helmet` integration for HTTP security headers.
  * Account blocking guard to prevent unauthorized access.
* **Advanced Querying**: Search, filter by category, sort (price/date), and pagination supported out of the box.
* **Atomic MongoDB Operations**: Advanced updates utilizing `$inc`, `$unset`, `$addToSet`, and `$pull`.
* **Logging & Monitoring**: Custom `morgan` middleware linked with `winston` structured file logging. Slow requests (>500ms) are automatically flagged as performance warnings.
* **Global Error Handling**: Custom error classes with structured JSON responses and async handler wrappers to keep controllers clean.

* 

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB with Mongoose ORM
* **Security**: JSON Web Tokens (JWT), Bcrypt.js, Helmet
* **Logging**: Winston, Morgan

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


📌 API Endpoints
🔑 Auth Routes (/api/v1/auth)
POST /register - Register a new user

POST /login - Authenticate user & get JWT token

💸 Expense Routes (/api/v1/expenses)
GET / - Fetch all expenses (Supports pagination: ?page=1&limit=10, sorting: ?sort=price-asc, searching: ?search=grocery, filtering: ?category=Food)

POST / - Create a new expense entry

GET /:id - Get a specific expense by ID

PATCH /:id - Update expense details

DELETE /:id - Delete an expense

PATCH /atomic/:id - Execute atomic operations ($inc, $unset, $addToSet, $pull)
