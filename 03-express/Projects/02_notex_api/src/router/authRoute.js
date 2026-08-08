import express from 'express';
import authRegisterController from '../controller/registerController.js';
import authLoginController from '../controller/loginController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import users from '../config/users.js';
import isAuthorized from '../middleware/isAuthorized.js';
import restrictTo from '../middleware/isRestricted.js';
import authLogoutController from '../controller/logoutController.js';

const router = express.Router();


// static authorized middleware
// router.get("/dashboard", isAuthenticated, isAuthorized, (req, res) =>{
//     res.json({
//         message: "Success",
//         list: users
//     })
// })



// Sirf Admin access kar sakta hai
router.get("/dashboard", isAuthenticated, restrictTo('admin'), (req, res) => {
    res.json({ success: true, message: "Welcome Admin!" });
});

// Admin aur Manager dono access kar sakte hain
router.get("/analytics", isAuthenticated, restrictTo('admin', 'manager'), (req, res) => {
    res.json({ success: true, message: "Analytics Data" });
});

// POST : REGISTER USER
router.post('/auth/register', authRegisterController);
router.post('/auth/login', authLoginController);
router.post("/auth/logout",isAuthenticated, authLogoutController)

export default router;