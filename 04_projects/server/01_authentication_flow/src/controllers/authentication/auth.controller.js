import {
  loginUserService,
  registerUserService,
  verifyEmailService,
  verifyLoginOtpService
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

// lOGIN CONTROLLER
// export const login = asynHandler(async (req, res) => {
//   const { token, user } = await loginUserService(req.body);

//   return res.status(200).json({
//     success: true,
//     statusCode: 200,
//     message: "✅ User logged in successfully.",
//     data: {
//       token,
//       user,
//     },
//   });
// });



// LOGIN CONTROLLER
export const login = asynHandler(async (req, res) => {
  const result = await loginUserService(req.body);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "✅ Credentials verified. An OTP has been sent to your registered email.",
    data: result,
  });
});



// VERIFY LOGIN OTP CONTROLLER
export const verifyLoginOtp = asynHandler(async (req, res) => {
  const result = await verifyLoginOtpService(req.body);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "✅ Login successful! Welcome back.",
    data: result,
  });
});

