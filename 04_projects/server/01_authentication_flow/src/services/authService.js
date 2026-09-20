import User from "../model/user.js";
import AppError from "../utils/customError.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { createCryptoToken } from "../utils/createCryptoToken.js";
import { sendMail } from "../utils/sendMail.js";
import crypto from "crypto";

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
    <p>H1 ${user.name} please verify your email by clicking the link below:</p>
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

  // 4. Generate token
  const token = generateToken(user);

  // 5. Convert mongoose document to plain object to safely delete password
  const userDB = user.toObject();
  delete userDB.password;

  return { token, user: userDB };
};

// VERIFY EMAIL SERVICES
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
