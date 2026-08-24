

import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
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



const User = mongoose.model('user', userSchema);


export default User;