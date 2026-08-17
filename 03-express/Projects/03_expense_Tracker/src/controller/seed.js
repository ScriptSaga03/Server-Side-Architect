

import asyncHandler from '../utils/asyncHandler.js';
import Expense from '../model/expenseModel.js';
import customError from '../utils/customError.js';




const seedData   =  asyncHandler(async(req, res) => {
    const {seedArray} = req.body;
    // validation check 
    if(!Array.isArray(seedArray) || seedArray.length === 0){
        throw customError(400,"❌ Data must be required!");
    }

    // Max limit protection 
    if(seedArray.length > 100){
        throw customError(400, "⚠ Cannot upload more than 100 items at once!")
    }

    await Expense.deleteMany({});
    const expenses = await Expense.insertMany(seedArray);

    return res.status(201).json({
        success: true,
       message: `✔ ${expenses.length} items created successfully.`,
        count: expenses.length,
        data:expenses
    })

})

export default seedData;