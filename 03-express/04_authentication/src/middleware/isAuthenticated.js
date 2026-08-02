import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../helpers/jwt.js';

const isAuthenticated = (req, res, next) => {
    // 1. Header se token nikaalo
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Please Login First, credentials not found'
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // 2. Token verify karo
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. req object par userId attach karo
        req.userId = decoded.id;
        next();

    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token!' 
        });
    }
};

export default isAuthenticated;