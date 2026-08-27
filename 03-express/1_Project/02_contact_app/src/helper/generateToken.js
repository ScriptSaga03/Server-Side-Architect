
import jwt from 'jsonwebtoken';


// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;

const generateToken = (user) => {

    const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
    throw new Error("FATAL: JWT_SECRET_KEY is missing in environment variables.");
};
const options = { expiresIn: process.env.JWT_EXPIRED_IN };


    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }


    return jwt.sign(payload, secretKey, options)
};


export default generateToken;