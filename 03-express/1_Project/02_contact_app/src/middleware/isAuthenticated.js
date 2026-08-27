import customError from '../utils/customError.js';
import jwt from 'jsonwebtoken';
import User from '../model/auth/userModel.js';


const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. MISSING HEADER GUARD
        if (!authHeader) {
            return next(customError(401, "Please login to access this resource"));
        }

        // 2. CHECK BEARER PREFIX 
        if (!authHeader.startsWith("Bearer ")) {
            return next(customError(401, "❌ Invalid token format!"));
        }

        // 3. EXTRACT TOKEN 
        const token = authHeader.split(" ")[1];

        if (!token || token.trim() === "") {
            return next(customError(401, "❌ Token Missing!"));
        }

        // 4. VERIFY TOKEN SIGNATURE
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Fetch document
        const user = await User.findById(decoded.id).lean();

        // 5. EXISTENCE GUARD
        if (!user) {
            return next(customError(401, "❌ User no longer exists!"));
        }

        // 6. BLOCKED GUARD
        if (user.isBlocked) {
            return next(customError(403, "🚫 Your account has been blocked!"));
        }

        // 7. ATTACH FULL USER OBJ TO REQ
        req.user = user;

        
        // Move to next middleware / controller
        return next();

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return next(customError(401, "⏰ Session expired! Please login again."));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(customError(401, "❌ Invalid token! Please login again."));
        }
        
        return next(error);
    }
};

export default isAuthenticated;
