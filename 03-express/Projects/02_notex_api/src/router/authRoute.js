import express from 'express';
import authRegisterController from '../controller/registerController.js';
import authLoginController from '../controller/loginController.js';


const router = express.Router();


// POST : REGISTER USER
router.post('/auth/register', authRegisterController);
router.post('/auth/login', authLoginController)

export default router;