import {
  loginUserService,
  registerUserService,
  verifyEmailService,
} from "../../services/authService.js";
import asynHandler from "../../utils/asyncHandler.js";

// REGISTER CONTROLLER
export const register = asynHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message:
      "✅ Registration successful! Please check your email to verify your account.",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
});

// lOGIN CONTROLLER
export const login = asynHandler(async (req, res) => {
  const { token, user } = await loginUserService(req.body);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "✅ User logged in successfully.",
    data: {
      token,
      user,
    },
  });
});

// VERIFY EMAIL CONTROLLER
export const verifyEmail = asynHandler(async (req, res) => {
  const { token } = req.query;

  const result = await verifyEmailService(token);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "✅ Email verified successfully! You can now log in.",
    data: result,
  });
});
