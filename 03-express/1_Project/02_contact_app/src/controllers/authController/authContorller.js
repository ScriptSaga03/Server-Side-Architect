import asyncHandler from '../../utils/asyncHandler.js';
import User from '../../model/auth/userModel.js';
import customError from '../../utils/customError.js';
import bcrypt from 'bcryptjs';
import generateToken from '../../helper/generateToken.js';



// REGISTER CONTROLLER
export const registerUserController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;


    // FETCH DOCUMENT 
    const isUserExist = await User.findOne({ email }).lean();
    // DUPLICATE CHECK 
    if (isUserExist) {
        throw customError(409, `⚠ Email already register!, Please login`);
    }

    // PASSWORD HASHING 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  CREATE NEW USER
    const createUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    // 5. Convert Mongoose Document to Plain JS Object to remove password safely
    const userData = createUser.toObject();
    delete userData.password;


    return res.status(201).json({
        success: true,
        message: `✔ User register successfully.`,
        data: userData
    })

});



// LOGIN CONTROLLER 
export const loginUserController = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // FETCH DOCUMENT
    const user = await User.findOne({ email }).select("+password").lean();
    if (!user) {
        throw customError(401, "❌ User not found! Please signup first")
    }

    // CHECK IS ACCOUND BLOCKED || USER SUSPENSION / BLOCKING GUARD 
    if (user.isBlocked) {
        throw customError(409, "🚫 Your account has been blocke. Please contact us! ")
    }


    // MATCH / COMPARED PASSWORD
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw customError(401, "❌ Invalid email & password!")
    }

    // GENERATE TOKEN 
    const token = generateToken(user);


    // SENITIZED USER OUTPUT 
    delete user.password;


    // SEND RESPONSE
    return res.status(200).json({
        success: true,
        message: "✔ User loggin successfull",
        token,
        data: user
    })

});