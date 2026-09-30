


import express from 'express';
import { createNewTask, deleteTaskValidationRule, getTaskValidationRule, updateTaskValidationRule, } from '../validators/taskValidationRules.js';
import { validationMiddleware } from '../middleware/task/validationMiddleware.js';
import { createTask, getAllTask, getSingleTask, removeTask, updateTask } from '../controller/task.controller.js';
const router = express.Router();


router.route("/")
        .get(getAllTask)
        .post(createNewTask, validationMiddleware, createTask);

router.route("/:id")
    .get(getTaskValidationRule,validationMiddleware,getSingleTask)
    .patch(updateTaskValidationRule, validationMiddleware,updateTask)
    .delete(deleteTaskValidationRule,validationMiddleware,removeTask)

export default router;