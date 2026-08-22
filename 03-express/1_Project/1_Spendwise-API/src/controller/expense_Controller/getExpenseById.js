import mongoose from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import customError from "../../utils/customError.js";
import Expense from "../../model/expenseModel.js";


const getExpenseById = asyncHandler(async(req, res) => {
    const {id} = req.params;
   
    
    // validation check 
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw customError(400, "❌ Invalid Expense ID Format");
    }

    // FETCH DUCUMENT
    const expense = await Expense.findById(id).select("-__v").lean();

    // document existence check 
    if(!expense){
        throw customError(404, "Expense Record not found!")
    }

    // send response
    return res.status(200).json({
        success:true, 
        data:expense
    })
});


export default getExpenseById;