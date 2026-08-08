import tokenBlacklist from "../config/tokenBlacklist.js";
import asyncHandler from "../utils/asyncHandler.js";



const authLogoutController = asyncHandler(async(req, res) => {


    const authHeader  = req.headers.authorization;
    const token = authHeader.split(" ")[1];


    if(token){
        tokenBlacklist.push(token)
    };

    return res.status(200).json({
        success:true,
        message: "✔ Logout Successfull."
    })
});



export default authLogoutController;