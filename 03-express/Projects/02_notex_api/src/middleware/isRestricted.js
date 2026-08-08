import asyncHandler from "../utils/asyncHandler.js";
import customErrorHandler from "../utils/customErrorHandler.js";

// Multi-role support ke liye rest parameter (...roles) use kiya hai
const restrictTo = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        // 1. Guard check: Ensure isAuthenticated middleware running prior to this
        if (!req.user) {
            throw customErrorHandler(401, "⚠ Authentication required! Please log in first.");
        }

        // 2. Check if user's role is in the allowed roles array
        if (!roles.includes(req.user.role)) {
            throw customErrorHandler(403, "❌ Access denied! You do not have permission to perform this action.");
        }

        next();
    });
};

export default restrictTo;