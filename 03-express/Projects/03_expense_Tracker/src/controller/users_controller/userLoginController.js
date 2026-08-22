


import User from "../../model/userModel.js";
import bcrypt from 'bcryptjs'
import asyncHandler from "../../utils/asyncHandler.js";
import { generateToken } from "../../helper/generateToken.js";
import customError from "../../utils/customError.js";


export const userLoginController = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    // CHECK EMPTY BODY 
    if(!req.body || Object.keys(req.body).length === 0){
        throw customError(400, "❌ Please fill the form correctly!")
    }


    // VALIDATION CHECK     
    if(!email || !password){
        throw customError(400, "⚠ Email and password are required fields!")
    }


    // Find User 
    const user  = await User.findOne({email}).select("+password");
    // CHECK EXISTENCE GUARD
    if(!user){
        throw customError(401, "❌ User not found! Please register first.")
    }
    // CHECK IS ACCOUNT IS BLOCKED / User Suspension / Blocking Guard (403 Forbidden)
    if(user.isBlocked){
      throw customError(403, "🚫 Your account has been blocked. Please contact us!");
    }


    // MATCH / COMPARED PASSWORD  (PLAIN AND HASHED PASSWORD)
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched){
        throw customError(401, "❌ Invalid email or password!")
    }


    // TOKEN GENERATE
    const token  = generateToken(user);

    // SENITIZE USER OUTPUT
    const userData = user.toObject();
    delete userData.password;

    // SEND SUCCESS RESPONSE
    return res.status(200).json({
        success:true,
        message:"✔ User loggin successfull",
        token,
        data:userData
    })




})