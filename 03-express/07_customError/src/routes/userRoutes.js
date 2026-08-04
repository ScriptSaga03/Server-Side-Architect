import express from 'express';
import registerUserController from '../controllers/userRagisterController.js';
import users from '../config/users.js'
import userLoginController from '../controllers/userLoginController.js';

const router = express.Router();


// GET /api/users
router.get('/users', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});


// POST /api/users
router.post('/register', registerUserController);
router.post('/login', userLoginController)
export default router;



