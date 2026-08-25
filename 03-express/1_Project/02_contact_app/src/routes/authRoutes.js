
import express from 'express';
import { loginUserController, registerUserController as register } from '../controllers/authController/authContorller.js';
import { loginValidationRules as loginValidation, registerValidationRules as validation } from '../middleware/authValidator.js';



const router = express.Router();



// POST
router.post("/register", validation, register);
router.post("/login", loginValidation, loginUserController)



export default router;