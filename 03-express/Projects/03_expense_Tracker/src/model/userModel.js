import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        lowercase: true,
        minLength: [3, "Username must be at least 3 characters."],
        maxLength: [30, "Username must not exceed 30 characters."],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },

    passwordChangedAt: {
        type: Date,
        default: null
    }
},
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;


// select: false: Direct DB fetch queries (User.find()) mein password field accidentally leaked hone se bachaata hai.