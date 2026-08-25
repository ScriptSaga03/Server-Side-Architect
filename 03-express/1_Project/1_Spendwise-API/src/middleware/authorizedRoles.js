import customError from "../utils/customError.js";

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        // 1. Authentication Check
        if (!req.user) {
            return next(customError(401, "❌ Unauthenticated! Please login first."));
        }

        // 2. Role Authorization Check
        if (!allowedRoles.includes(req.user.role)) {
            return next(customError(403, "🚫 Access denied! You do not have permission."));
        }

        return next();
    };
};
