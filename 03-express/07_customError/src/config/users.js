// src/config/userData.js

const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    password: "123456",
    role: "admin",
    isBlocked: false, 
    passwordChangedAt: Date.now(),
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@gmail.com",
    password: "password123",
    role: "user",
    isBlocked: true,
    passwordChangedAt: Date.now(), 
  },
  {
    id: 3,
    name: "Mehtab Ansari",
    email: "mehtab@gmail.com",
    password: "password123",
    role: "admin", 
    isBlocked: false,
    passwordChangedAt: null,
  },
  {
    id: 4,
    name: "Amit Kumar",
    email: "amit@gmail.com",
    password: "password123",
    role: "user", 
    isBlocked: false,
    passwordChangedAt: null,
  }
];

export default users;