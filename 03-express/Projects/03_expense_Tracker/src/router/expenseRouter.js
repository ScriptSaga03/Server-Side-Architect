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
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { authorizeRoles } from "../middleware/authorizedRoles.js";

const router = express.Router();


// TOP LEVEL ROUTES
router.use(isAuthenticated); // Apply authentication middleware to all routes

// STRICT PRIVACY GUARD : ONLY "USER " ROLE CAN ACCESS THESE ROUTES
router.use(authorizeRoles("user")); // Apply role-based authorization middleware
router.route("/")
    .get(getAllExpenses)
    .post(validateEmptyBody,createExpense);

router.route("/:id")
    .get(getExpenseById)
    .patch(validateEmptyBody,updateExpense)
    .delete(deleteExpense);

router.route("/atomic/:id")
    .patch(validateEmptyBody, applyAtomicUpdate);

export default router;