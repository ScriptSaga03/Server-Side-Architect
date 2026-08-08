import jwt from 'jsonwebtoken';
import users from "../config/users.js";
import asyncHandler from "../utils/asyncHandler.js";
import customErrorHandler from "../utils/customErrorHandler.js";
import tokenBlacklist from '../config/tokenBlacklist.js';

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
   

    // 1. Missing Header Guard
    if (!authHeader) {
        throw customErrorHandler(401, '⚠ Please log in first to access this resource!');
    }

    // 2. Check Bearer Prefix & Extract Token
    if (!authHeader.startsWith("Bearer ")) {
        throw customErrorHandler(401, "⚠ Invalid token format. Format must be 'Bearer <token>'!");
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw customErrorHandler(401, '⚠ Token missing after Bearer prefix!');
    }

    // if tokenblacklist has token 
    if(tokenBlacklist.includes(token)){
        throw customErrorHandler(401, "token has been revoked, please login again")
    }

    // 3. Verify Token Signature
    // Note: Agar token invalid ya expire hoga, toh jwt.verify error throw karega jo asyncHandler catch kar lega
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 4. Check if User still exists in DB
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
        throw customErrorHandler(401, '❌ User associated with this token no longer exists!');
    }

    // 5. Attach Full User Object to Request
    req.user = user;

    next();
});

export default isAuthenticated;