import mongoose from "mongoose";
import Expense from "../../model/expenseModel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import customError from "../../utils/customError.js";

// CREATE SINGLE DOCUMENT 
export const createExpense = asyncHandler(async (req, res) => {
    const { title, amount, category, paymentMethod, isRecurring } = req.body;

    if (!title || !amount || !category) {
        throw customError(400, "Title, category and amount are required!");
    }

    const expense = await Expense.create({
        title,
        amount,
        category,
        paymentMethod,
        isRecurring
    });

    return res.status(201).json({
        success: true,
        message: "✔ Expense logged successfully",
        data: expense
    });
});

// UPDATE DOCUMENT 
export const updateExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw customError(400, "Invalid Expense ID Format");
    }

  
    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    ).select("-__v").lean();

    if (!updatedExpense) {
        throw customError(404, "Expense not found to update!");
    }

    return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: updatedExpense // Fixed variable name typo here
    });
});

// DELETE DOCUMENT 
export const deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw customError(400, "Invalid Expense ID Format");
    }

    const removeExp = await Expense.findByIdAndDelete(id).lean();

    if (!removeExp) {
        throw customError(404, "Expense not found to delete!");
    }

    // Fixed: Return explicit JSON response
    return res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
        data: { id: removeExp._id }
    });
});

// GET EXPENSE BY ID
export const getExpenseById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw customError(400, "Invalid Expense ID Format");
    }

    const expense = await Expense.findById(id).select("-__v").lean();

    if (!expense) {
        throw customError(404, "Expense not found");
    }

    return res.status(200).json({
        success: true,
        message: "Expense found successfully",
        data: expense
    });
});





// ADVANCED ATOMIC UPDATE OPERATORS DEMO
export const applyAtomicUpdate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { amountDelta, removeNote, addTag, removeTag } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw customError(400, "Invalid Expense ID Format");
    }

    const updateQuery = {};

    // 1. $inc Operator: Amount ko DB level par update karna (e.g. +100 ya -50)
    if (amountDelta) {
        updateQuery.$inc = { amount: Number(amountDelta) };
    }

    // 2. $unset Operator: Unwanted field ko document se delete karna
    if (removeNote) {
        updateQuery.$unset = { note: "" };
    }

    // 3. $addToSet Operator: Array mein unique tag push karna
    if (addTag) {
        updateQuery.$addToSet = { tags: addTag };
    }

    // 4. $pull Operator: Array se element pull/remove karna
    if (removeTag) {
        updateQuery.$pull = { tags: removeTag };
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        updateQuery,
        { new: true, runValidators: true }
    ).select("-__v").lean();

    if (!updatedExpense) {
        throw customError(404, "Expense not found to update!");
    }

    return res.status(200).json({
        success: true,
        message: "✔ Atomic update applied successfully",
        data: updatedExpense
    });
});