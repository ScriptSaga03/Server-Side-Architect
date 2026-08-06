import createCustomError from "../utils/createCustomError.js"



const isAuthorized = (req, res, next) =>{

    if(!req.user){
        return next(createCustomError(401, '⚠ Authentication Required!'))
    }

    // role check for admin 
    if(req.user.role !=='admin'){
        return next(createCustomError(401, "❌ Access Denied! Admin privileges required!"))
    }
    next()
};

export default isAuthorized;