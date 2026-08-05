import { generateToken } from '../utils/generateToken.js';
import users from '../config/users.js'
import createCustomError  from '../utils/createCustomError.js'

const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Empty Body Guard
    if (!req.body || Object.keys(req.body).length === 0) {
      throw createCustomError(400, "⚠ Request body cannot be empty!");
    }

    // 2. Missing Input Guard
    if (!email || !password) {
      throw createCustomError(400, "⚠ All fields are required!");
    }

    // 3. Find User (404 Not Found)
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw createCustomError(404, "User not found!");
    }

    // 4. Password Match Guard (401 Unauthorized)
    if (password !== user.password) {
      throw createCustomError(401, "Invalid password!");
    }

    // 5. User Suspension / Blocking Guard (403 Forbidden)
    if (user.isBlocked) {
      throw createCustomError(403, "⚠ Your account has been suspended! Please contact support.");
    }

    // 6. Token Generation
    const token = generateToken(user);

    // 7. Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};

export default userLoginController;