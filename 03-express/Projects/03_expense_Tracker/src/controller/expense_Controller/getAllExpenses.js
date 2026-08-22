import asyncHandler from '../../utils/asyncHandler.js';
import Expense from '../../model/expenseModel.js';
import customError from '../../utils/customError.js';

const getAllExpenses = asyncHandler(async (req, res) => {
    // Destructure Query Parameters
    const { search, category, page = 1, limit = 10, sort } = req.query;

    // PAGINATION 
    const pageNum = Math.max(1, +page);
    const limitNum = Math.max(1, +limit);
    const skip = (pageNum - 1) * limitNum;

    // Build Dynamic Mongo Filter Object
    const queryOBJ = {userId:req.user._id};
    const sortingOpt = {};

    // SORTING LOGIC 
    if (sort === "price-asc") {
        sortingOpt.amount = 1;
    } else if (sort === "price-desc") {
        sortingOpt.amount = -1;
    } else if (sort === "oldest") {
        sortingOpt.createdAt = 1;
    } else {
        sortingOpt.createdAt = -1; // Default: Newest First
    }

    // SEARCH LOGIC 
    if (search) {
        queryOBJ.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    // CATEGORY FILTER
    if (category) {
        const categoryList = category
            .split(",")
            .map(cat => cat.trim())
            .filter(Boolean)
            .map(cat => new RegExp(`^${cat}$`, "i"));
            
        queryOBJ.category = { $in: categoryList };
    }

    // EXECUTE QUERY
    const expenses = await Expense.find(queryOBJ)
        .sort(sortingOpt)
        .skip(skip)
        .limit(limitNum)
        .select("-__v")
        .lean();

    // RESPONSE
    return res.status(200).json({
        success: true,
        message: expenses.length > 0
            ? `✔ ${expenses.length} items found successfully.`
            : "⚠️ No expenses match your search query.",
        count: expenses.length,
        data: expenses
    });
});

export default getAllExpenses;