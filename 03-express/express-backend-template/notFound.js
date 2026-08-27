import asyncHandler from "./asyncHandler.js";
import customError from "./customError.js";



const routeNotFound = asyncHandler(async(req, res)=>{
    throw customError(404, `❌ Can't find ${req.originalUrl} on this server!`)
})

export default routeNotFound;