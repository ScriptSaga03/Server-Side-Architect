


import jwt from 'jsonwebtoken';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "narutoUzumaki";
const option = {expiresIn : process.env.JWT_EXPIRED_IN || '1h'};


const generateToken = (user)=>{
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }


    return jwt.sign(payload, JWT_SECRET_KEY, option)
}


export default generateToken;