
import jwt from 'jsonwebtoken';


const JWT_SECRET_KEY = process.env.JWT_WEB_TOKEN || "mysuperSecretKey123";
const options = {expiresIn: process.env.JWT_EXPIRY_IN || '1h' };


export const generateToken  = (user) =>{
    const payload = {
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    return jwt.sign(payload,JWT_SECRET_KEY, options )
}
