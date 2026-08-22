
import jwt from 'jsonwebtoken';


export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "mysuperSecretKey123";
const options = {expiresIn: process.env.JWT_EXPIRED_IN || '2min' };


export const generateToken  = (user) =>{
    const payload = {
        id:user._id,
        name:user.username,
        email:user.email,
        role:user.role
    }

    return jwt.sign(payload,JWT_SECRET_KEY, options )
}
