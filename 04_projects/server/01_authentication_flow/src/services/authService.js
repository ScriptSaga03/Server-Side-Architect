import User from "../model/user.js";
import crypto from "crypto";
import AppError from "../utils/customError.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { createCryptoToken } from "../utils/createCryptoToken.js";
import { sendMail } from "../utils/sendMail.js";
import { generateOTP } from "../utils/generateOTP.js";







// REGISTER USER SERVICES
export const registerUserService = async (userData) => {
  const { name, email, password } = userData;

  // CHECK IF USER ALREADY EXIST
  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    throw AppError(400, "❌ Email is already register!");
  }

  // PASSWORD HASHING
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate Email verification token
  const { plainToken, hashedToken } = createCryptoToken();

  // CREATE NEW USER
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    isVerified: false,
  });

  // send verification email
  const verificationUrl = `${process.env.CLIENT_URL}/api/v1/auth/verify-email?token=${plainToken}`;

  const emailMessage = `
    <h1>Email Verification</h1>
    <p>${user.name} please verify your email by clicking the link below:</p>
    <a href="${verificationUrl}"   target="_blank">Verify Email</a>
    <p>This link will expire in 24 hours.</p>
  `;

  try {
    await sendMail({
      email: user.email,
      subject: "Verify Your Email Address",
      html: emailMessage,
    });
  } catch (error) {
    // Cleanup token fields if email sending fails
    await User.findByIdAndDelete(user._id);
    throw AppError(500, "❌ Email could not be sent. Please try again later!");
  }

  /// Sanitize return object
  const userDB = user.toObject();
  delete userDB.password;
  delete userDB.emailVerificationToken;
  delete userDB.emailVerificationExpires;

  return userDB;
};







// VERIFY EMAIL SERVICES For Register User
export const verifyEmailService = async (plainToken) => {
  if (!plainToken) {
    throw AppError(400, "❌ Verification token is missing!");
  }

  // 1. Hash incoming plain token to compare with DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");

  // 2. Find user with matching token and valid expiry
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw AppError(400, "❌ Invalid or expired verification token!");
  }

  // 3. Update user status & clear token fields
  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save({ validateBeforeSave: false });

  return { email: user.email, isVerified: user.isVerified };
};






////////////////////////////////////////// LOGIN SERVICES ////////////////////////////////////////// 


// LOGIN USER SERVICES
export const loginUserService = async (userData) => {
  const { email, password } = userData;

  // 1. Fetch user with password (+select)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw AppError(401, "❌ Invalid email or password!");
  }

  // check if user is verified
  if (!user.isVerified) {
    throw AppError(
      403,
      "❌ Your email is not verified! Please verify your email first.",
    );
  }

  // 2. Check if user is blocked
  if (user.isBlocked) {
    throw AppError(403, "🚫 Your account has been blocked, Contact admin!");
  }

  // 3. Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw AppError(401, "❌ Invalid email or password!");
  }


  // Generate 6 digit opt & hash
  const { plainOtp, hashedOtp } = generateOTP();

  // 6. Save Hashed OTP & 10-Minute Expiry to DB
  user.loginOtp = hashedOtp;
  user.loginOtpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes
  await user.save({ validateBeforeSave: false });

  // SEND Plain OTP via Email
  const otpMessage = `
    <h1>Login Verification Code</h1>
    <p>Hi ${user.name}, your One-Time Password (OTP) for logging in is:</p>
    <h2 style="color: #4CAF50; letter-spacing: 4px;">${plainOtp}</h2>
    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
  `;


  try {
    await sendMail({
      email: user.email,
      subject: "Your Login Verification OTP",
      html: otpMessage,
    });
  } catch (error) {
    user.loginOtp = undefined;
    user.loginOtpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw AppError(500, "❌ Failed to send OTP email. Please try again!");
  }

  // Return non-sensitive payload for Step 2
  return {
    userId: user._id,
    email: user.email,
  };
};




// VERIFY LOGIN OTP SERVICE (Step 2: Verify OTP -> Issue JWT)
export const verifyLoginOtpService = async ({ email, otp }) => {
  if (!email || !otp) {
    throw AppError(400, "❌ Email and OTP are required!");
  }

  // 1. Plain OTP ko SHA-256 se Hash karo
  const hashedOtp = crypto
    .createHash("sha256")
    .update(otp.toString())
    .digest("hex");

  // 2. Find user with matching hashed OTP and valid expiry
  const user = await User.findOne({
    email,
    loginOtp: hashedOtp,
    loginOtpExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw AppError(400, "❌ Invalid or expired OTP!");
  }

  // 3. Clear OTP fields after successful verification
  user.loginOtp = undefined;
  user.loginOtpExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 4. Generate final JWT Access Token
  const token = generateToken(user);

  // 5. Sanitize user payload
  const userDB = user.toObject();
  delete userDB.password;

  return { token, user: userDB };
};