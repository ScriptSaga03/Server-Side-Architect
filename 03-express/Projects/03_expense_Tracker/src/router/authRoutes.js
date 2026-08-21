

import express from 'express';
import { registerUserController } from '../controller/users_controller/userRagisterController.js';

const router = express.Router();


router.post("/auth/register", registerUserController)



export default router;