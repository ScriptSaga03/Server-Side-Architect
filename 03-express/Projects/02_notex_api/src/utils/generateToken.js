import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const secret_key = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: process.env.JWT_EXPIRED_IN };

    return jwt.sign(payload, secret_key, options);
};

export default generateToken;