import crypto from "crypto";

export const createCryptoToken = () => {
  const plainToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");

  return { plainToken, hashedToken };
};
