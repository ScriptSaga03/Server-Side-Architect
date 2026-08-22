import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minLength: [3, "Title must be at least 3 characters"],
            maxLength: [50, "Title must not exceed 50 characters"]
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [1, "Amount must be at least 1"] 
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: {
                values: ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Other"],
                message: "{VALUE} is not a valid category"
            },
            default: "Other"
        },
        paymentMethod: { 
            type: String,
            required: [true, "Payment method is required"],
            enum: {
                values: ["UPI", "Credit Card", "Debit Card", "Cash"],
                message: "{VALUE} is not a valid payment method"
            },
            default: "Cash"
        },
        isRecurring: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: Date.now 
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:[true, "Expense must belong to a user!"]
        }
    },
    {
        timestamps: true // 👈 Automatically adds createdAt and updatedAt
    }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;