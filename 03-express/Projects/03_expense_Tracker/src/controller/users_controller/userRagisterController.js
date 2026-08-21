import bcrypt from 'bcryptjs';
import User from '../../model/userModel.js';
import customError from '../../utils/customError.js';
import asyncHandler from '../../utils/asyncHandler.js';


export const registerUserController = asyncHandler(async (req, res) => {
    // 1. Check Empty Body
    if (!req.body || Object.keys(req.body).length === 0) {
        throw customError(400, "❌ Please fill the form correctly");
    }

    const { username, email, password } = req.body;

    // 2. Validation
    if (!username || !email || !password) {
        throw customError(400, "❌ Username, email, and password are required!");
    }

    if(password.length < 6){
        throw customError(400, "Password must be 6 character")
    }

    // 3. Email Duplication Verification
    const isUserExist = await User.findOne({ email }).lean();
    if (isUserExist) {
        throw customError(409, "⚠️ Email already registered!, please login!");
    }


    // Password Hashing 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = {
        username,
        email,
        password: hashedPassword,
        isBlocked: false,
        passwordChangedAt: null
    }

    const createUser = await User.create(newUser);

    // 5. Convert Mongoose Document to Plain JS Object to remove password safely
    const userData = createUser.toObject();
    delete userData.password;

    return res.status(201).json({
        success: true,
        message: `✔ User register successfully.`,
        data: userData
    })

})