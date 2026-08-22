
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import customError from '../utils/customError.js';
import User from '../model/userModel.js';
import { JWT_SECRET_KEY } from '../helper/generateToken.js';



export const isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // MISSING HEADER GUARD
        if (!authHeader) {
            throw customError(401, "❌ Please login first to access this resource!")
        }

        //    CHECK BEARER PREFIX & EXTRACT TOKEN 
        if (!authHeader.startsWith("Bearer ")) {
            throw customError(401, "❌ Invalid token format!")
        }

        //    EXTRACT TOKEN 
        const token = authHeader.split(" ")[1];
        //    TOKEN EXISTENSE
        if (!token) {
            throw customError(401, "❌ Token mission!")
        }



        // VERIRY TOKEN SIGNRATURE
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // CHECK USER STILL EXIST IN DB
        const user = await User.findById(decoded.id).lean();
        // EXISTENCE GUARD
        if (!user) {
            throw customError(401, "❌ User associated with this token no longer exists!")
        }

        // BLOCKED GUARD
        if (user.isBlocked) {
            throw customError(403, "🚫 Your account has been blocked!")
        }

        // ATTACH FULL USER OBJ TO REQUEST
        req.user = user;
        next()


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw customError(401, "⏰ Session expired! Please login again.")
        }
        if (error.name === 'JsonWebTokenError') {
            throw customError(401, "❌ Invalid token! Please login again.")
        }

        throw error
    }


});
