

import express from 'express';
import { registerUserController  as userRegister} from '../controller/users_controller/userRegisterController.js';
import { userLoginController as userLogin } from '../controller/users_controller/userLoginController.js';

const router = express.Router();


router.post("/register", userRegister);
router.post("/login", userLogin)


export default router;