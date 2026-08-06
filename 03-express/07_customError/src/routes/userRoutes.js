import express, { json } from 'express';
import registerUserController from '../controllers/userRagisterController.js';
import users from '../config/users.js'
import userLoginController from '../controllers/userLoginController.js';
import userLogoutController from '../controllers/userLogoutController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isAuthorized from '../middlewares/isAuthorized.js';

const router = express.Router();


// GET /api/users
router.get('/users', isAuthenticated, isAuthorized ,(req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});


router.get('/dashboard', isAuthenticated, isAuthorized, (req, res) =>{
  res.json({
    message: `<h1>WELCOME TO DASHBOAR</h1>`
  })
})

// POST /api/users
router.post('/register', registerUserController);
router.post('/login', userLoginController);
router.post('/logout', isAuthenticated,userLogoutController)
export default router;



