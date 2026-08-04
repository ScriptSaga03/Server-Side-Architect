import express from 'express';
import registerUserController from '../controllers/userRagisterController.js';
import users from '../config/users.js'

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
export default router;



