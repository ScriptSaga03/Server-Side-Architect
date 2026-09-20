import crypto from "crypto";

export const generateOTP = () => {
  // 1. Generate random 6-digit string (e.g., '582910')
  const plainOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. Hash the OTP using SHA-256 for secure DB storage
  const hashedOtp = crypto
    .createHash("sha256")
    .update(plainOtp)
    .digest("hex");

  return { plainOtp, hashedOtp };
};