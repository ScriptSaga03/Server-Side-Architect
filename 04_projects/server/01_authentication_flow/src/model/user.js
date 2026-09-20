import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    // Email verification and Password reset
    isVerified:{
      type:Boolean,
      default:false
    },
    emailVerificationToken:String,
    emailVerificationExpires:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
