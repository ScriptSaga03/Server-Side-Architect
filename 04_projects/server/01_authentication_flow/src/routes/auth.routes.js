

import express from 'express';
import { login, register, verifyEmail,verifyLoginOtp } from '../controllers/authentication/auth.controller.js';
import { loginValidationRule, registerValidationRules as validation , } from '../middleware/authMiddleware/authMiddleware.js';



const router  = express.Router();



router.get("/verify-email", verifyEmail);

router.post("/register", validation, register);
router.post("/login", loginValidationRule, login);


// 🎯 2FA Login OTP Verification Route
router.post("/verify-login-otp", verifyLoginOtp);


export default router


