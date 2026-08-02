import express from 'express';
import { loginUserController } from '../controllers/loginController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Public route
router.post('/login', loginUserController);

// Protected profile route (Practice testing ke liye)
router.get('/profile', isAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to protected profile route!",
        userId: req.userId
    });
});

export default router;