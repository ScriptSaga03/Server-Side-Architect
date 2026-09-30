import { body, param } from "express-validator";
import { isValidObjectId } from "mongoose";

// GET TASK VALIDATION
export const getTaskValidationRule = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required!")
    .bail()
    .custom((id) => {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid Task ID.");
      }

      return true;
    }),
];

// *****************************************************************************************

// CREATE TASK VALIDATION
export const createNewTask = [
  // TITLE
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters."),

  // DESCRIPTION
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  // STATUS
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed."),

  // PRIORITY
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high."),

  // DUE DATE
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date."),
];

// *****************************************************************************************

// UPDATE TASK VALIDATION RULES
export const updateTaskValidationRule = [
  // TASK ID
  param("id")
    .notEmpty()
    .withMessage("Task ID is required!")
    .bail()
    .isMongoId()
    .withMessage("❌ Invalid Task ID format!"),

  // AT LEAST ONE FIELD
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new Error("At least one field is required for update.");
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
    ];
    const receivedFields = Object.keys(req.body);

    const unknownFields = receivedFields.filter(
      (f) => !allowedFields.includes(f),
    );
    if (unknownFields.length > 0) {
      throw new Error(`Unknown fields : ${unknownFields.join(", ")}`);
    }

    return true;
  }),

  // TITLE
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters."),

  // DESCRIPTION
  body("description")
    .optional({ values: "undefined" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  // STATUS
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed."),

  // PRIORITY
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high."),

  // DUE DATE
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date."),
];

// *****************************************************************************************

// DELETE TASK VALIDATION RULES
export const deleteTaskValidationRule = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid Task ID."),
];
