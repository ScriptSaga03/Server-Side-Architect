import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payLoad = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(
        payLoad,
        process.env.JWT_SECRET || "mysecretkey123mehtab",
        { expiresIn: process.env.JWT_SECRET_EXPIRE || '1h' }
    );
};

