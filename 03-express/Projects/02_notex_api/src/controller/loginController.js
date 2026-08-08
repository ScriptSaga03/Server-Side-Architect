import generateToken from '../utils/generateToken.js'
import users from "../config/users.js";
import asyncHandler from "../utils/asyncHandler.js";
import customErrorHandler from "../utils/customErrorHandler.js";
import bcrypt from "bcryptjs";



const authLoginController = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;

    // VALIDATION  
    // req 
    if(!req.body || Object.keys(req.body).length === 0) {
        throw customErrorHandler(400, " ❌Request body cannot be empty!");
    }

    // CHECK EMAIL AND PASSWORD FIELDS ARE NOT EMPTY 
    if(!email || !password){
        throw customErrorHandler(400, "❌ All fields are required!")
    }

    // USER CHECKED IN DATABASE
   const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
        throw customErrorHandler(401, "❌ Invalid email or password!");
    }

    // COMPARE PASSWORD (plain and hashed password)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw customErrorHandler(401, "❌ Invalid email or password!");
    }


    // 5. User Suspension / Blocking Guard (403 Forbidden)
    if(user.isBlocked){
        throw customErrorHandler(403, "❌ Your account is suspended , Please Contact!");
    }

   // 6. Token Generation
    const token = generateToken(user);
    console.log('Generated Token:', token);

    // 7. Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

})


export default authLoginController;