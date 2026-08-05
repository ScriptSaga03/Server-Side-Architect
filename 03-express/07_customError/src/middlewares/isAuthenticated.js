import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/generateToken.js';
import createCustomError from '../utils/createCustomError.js';
import { tokenBlacklist } from '../config/tokenBlacklist.js';

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Missing Authorization Header
        if (!authHeader) {
            throw createCustomError(401, 'Authorization header is required');
        }

        // 2. Check Bearer Prefix
        if (!authHeader.startsWith('Bearer ')) {
            throw createCustomError(400, "Invalid token format. Must be 'Bearer <token>'");
        }


        // 3. Extract Token Part
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw createCustomError(401, 'Token missing after Bearer prefix');
        }

        if (tokenBlacklist.includes(token)) {
            throw createCustomError(401, "⚠ Token has been revoked, please login again!")
        }

        // 4. Verify Token Signature
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        // Catch JWT signature/expiration errors cleanly
        if (error.name === 'TokenExpiredError') {
            return next(createCustomError(401, '⚠ Token expired! Please login again.'));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(createCustomError(401, '⚠ Invalid or tampered token!'));
        }
        next(error);
    }
};

export default isAuthenticated;