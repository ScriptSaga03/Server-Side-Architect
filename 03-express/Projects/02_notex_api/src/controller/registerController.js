import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import users from '../config/users.js';
import customErrorHandler from '../utils/customErrorHandler.js';
import asyncHandler from '../utils/asyncHandler.js'



const authRegisterController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // validation 
    if (!req.body || Object.keys(req.body).length === 0) {
        throw customErrorHandler(400, '❌ Request body cannot be empty!');
    }

    if (!name || !email || !password) {
        throw customErrorHandler(400, "❌ All fields are required!")
    }

    // check duplicate users
    const isUserExist = [...users].some(u => u.email.toLowerCase() === email.toLowerCase());
    if (isUserExist) {
        throw customErrorHandler(409, "⚠ Email already registered!, please login!");
    };

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = {
        id: crypto.randomUUID(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: users.length === 1 ? "admin" :"user",
        isBlocked: false,
        passwordChangedAt: null,
        createdAt: new Date(),
        updatedAt: Date.now()
    }

    // add new user
    users.push(newUser);
    // send response hide sensitive fields
    const { password: _, ...userData } = newUser;

    res.status(201).json({
        success: true,
        message: "✔ User register successfully.",
        data: userData
    })
});



export default authRegisterController;