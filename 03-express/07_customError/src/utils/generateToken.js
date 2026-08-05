
import jwt from 'jsonwebtoken';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "mysecretkey@123";
export const generateToken = (user) =>{
    const payload = {
        id: user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }
   
    const options = { expiresIn : process.env.JWT_SECRET_EXPIRES || "1h"};

    return jwt.sign(payload, JWT_SECRET_KEY, options);

}