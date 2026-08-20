import customError from "../utils/customError.js";



export default function validateEmptyBody(req, res, next){
    if(!req.body || Object.keys(req.body).length === 0){
        return next(customError(400, "❌ Request body cannot be empty!"))
    }
    next()
}