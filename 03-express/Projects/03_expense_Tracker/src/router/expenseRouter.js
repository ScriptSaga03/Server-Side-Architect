import express from "express";
import getAllExpenses from "../controller/expense_Controller/getAllExpenses.js";
import { 
    createExpense, 
    updateExpense, 
    deleteExpense, 
    getExpenseById, 
    applyAtomicUpdate
} from "../controller/expense_Controller/expensesController.js";
import validateEmptyBody from "../middleware/validEmptyBody.js";
// import seedData from "../controller/expense_Controller/seed.js";

const router = express.Router();

router.route("/")
    .get(getAllExpenses)
    .post(createExpense);

router.route("/:id")
    .get(getExpenseById)
    .patch(validateEmptyBody,updateExpense)
    .delete(deleteExpense);

router.route("/atomic/:id")
    .patch(validateEmptyBody, applyAtomicUpdate);

export default router;