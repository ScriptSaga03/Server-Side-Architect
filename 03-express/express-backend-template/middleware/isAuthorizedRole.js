import customError from '../utils/customError.js';

const authorizedRole = (...allowedRoles) => (req, res, next) => {
    // 1. Authentication Check
    if (!req.user) {
        return next(customError(401, "❌ Authentication required! Please login first."));
    }

    // 2. Role Authorization Check 
    if (!allowedRoles.includes(req.user.role)) {
        return next(customError(403, "🚫 Access denied! You don't have permission for this action."));
    }

    return next();
};

export default authorizedRole;