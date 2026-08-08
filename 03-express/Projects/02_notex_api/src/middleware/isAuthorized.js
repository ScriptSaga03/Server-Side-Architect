import asyncHandler from "../utils/asyncHandler.js";
import customErrorHandler from "../utils/customErrorHandler.js";



const isAuthorized = asyncHandler(async(req, res, next) => {
    if(!req.user){
        throw customErrorHandler(401, "Authorization required!");
    }

    // role check for admin 
    if(req.user.role !== "admin"){
        throw customErrorHandler(403, "❌ Access denied! Admin privileges required.")
    }
    next()
})

export default isAuthorized;