



import { tokenBlacklist } from "../config/tokenBlacklist.js";


const userLogoutController = async(req, res, next) =>{

    try {
        // extract token from header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if(token){
            tokenBlacklist.push(token)
        }
        return res.status(200).json({
            success:true,
            message:"✔ Logged out successfully."
        })
    } catch (error) {
        next(error)
    }
}


export default userLogoutController;