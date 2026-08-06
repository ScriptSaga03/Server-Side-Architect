



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








/*


3. Problem 3: "Token Blacklist / Logout System"
Scenario
JWT stateless hota hai, lekin production apps mein jab user logout karta hai, toh uske token ko invalidate karna zaroori hota hai.

Tasks
In-memory array banaein: const tokenBlacklist = [];.

Ek naya protected route banaein: POST /api/logout.

logout controller mein request header se Token extract karein aur use tokenBlacklist array mein push kar dein.

Apne isAuthenticated middleware ko update karein: Token verify karne se pehle check karein ki kya incoming token tokenBlacklist array mein exist karta hai?

Agar token blacklisted hai, toh 401 Unauthorized error throw/return karein: "Token has been revoked. Please login again!".


*/