
import customError  from "../utils/customError.js";

export const authorizeRoles =(...allowedRoles) =>{
    return (req, res, next) => {

        // 1. Check if user is authenticated and has a role
        if(!req.user){
            throw customError(403, "🚫 You are not authorized to perform this action!");
        }

        // 2. Check if user's role is in the allowed roles array
        if(!allowedRoles.includes(req.user.role)){
            throw customError(403, "🚫 You are not authorized to perform this action!");
        }
        next();
    }
}