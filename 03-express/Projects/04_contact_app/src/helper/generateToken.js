
import jwt from 'jsonwebtoken';


export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'narutoUzumaki';
const options = { expiresIn: process.env.JWT_EXPIRED_IN || '1h' };

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }


    return jwt.sign(payload, JWT_SECRET_KEY, options)
};


export default generateToken;