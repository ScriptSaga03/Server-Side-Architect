import { body, param, query, validationResult } from "express-validator"
import { validateInput } from "./validateInput.js";



// 2. REUSABLE ID RULE (Bina validateInput middleware ke)
const idRule = param('id')
    .isMongoId().withMessage("❌ Invalid Contact ID format!");


// GET SINGLE CONTACT VALIDATION
export const getContactValidationRules = [
    idRule,
    validateInput
];


// Get Contact Validation
// export const getContactsValidationRules = [
//     query('page')
//         .optional()
//         .isInt({ min: 1 }).withMessage("Page must be a positive integer")
//         .toInt(),
//     query('limit')
//         .optional()
//         .isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100")
//         .toInt(),
//     query('category')
//         .optional()
//         .isIn(['personal', 'work', 'other']).withMessage("Invalid category type")
//         .trim(),
//     query('search')
//         .optional()
//         .isString().withMessage("Search query must be a string")
//         .trim()
//         .escape(), // Regex / Special character sanitization
//     query('sortBy')
//         .optional()
//         .isIn(['name', 'createdAt', 'updatedAt', 'category'])
//         .withMessage("Invalid sort field"),
//     query('order')
//         .optional()
//         .isIn(['asc', 'desc'])
//         .withMessage("Order must be either 'asc' or 'desc'"),
//     validateInput
// ];

export const getContactsValidationRules = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage("Page must be a positive integer")
        .toInt(),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100")
        .toInt(),
    query('category')
        .optional()
        .isIn(['personal', 'work', 'other']).withMessage("Invalid category type")
        .trim(),
    query('search')
        .optional()
        .isString().withMessage("Search query must be a string")
        .trim(),
    query('sortBy')
        .optional()
        .isIn(['name', 'createdAt', 'updatedAt', 'category'])
        .withMessage("Invalid sort field"),
    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage("Order must be either 'asc' or 'desc'"),
    validateInput
];

// CREATE NEW CONTACT VALIDATIONS
export const createContactValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage("Contact name is required").bail()
        .isLength({ min: 3, max: 50 }).withMessage("Name must be 3 to 50 characters"),

    body('phone')
        .trim()
        .notEmpty().withMessage("Phone is required")
        .isMobilePhone().withMessage("Please enter a valid phone number")
        .isLength({ min: 10, max: 10 }).withMessage("Contact number must be exactly 10 digits"),

    body('email')
        .optional({ checkFalsy: true }) // Optional email support
        .trim()
        .isEmail().withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body('category')
        .optional()
        .isIn(['personal', 'work', 'other']).withMessage("Category must be personal, work, or other"),

    validateInput
];


// 4. UPDATE CONTACT VALIDATION
export const updateContactValidationRules = [
    idRule, // Direct validation chain rule
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name Cannot be empty!')
        .isLength({ min: 3, max: 50 }).withMessage("Name must be 3 to 50 characters"),

    body('phone')
        .optional()
        .trim()
        .isMobilePhone().withMessage("Please enter a valid phone number")
        .isLength({ min: 10, max: 10 }).withMessage("Contact number must be exactly 10 digits"),

    body('email')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail().withMessage("Please enter a valid email address")
        .normalizeEmail(),
    body('category')
        .optional()
        .isIn(['personal', 'work', 'other']).withMessage("Category must be personal, work, or other"),


    validateInput
];

// 5. DELETE CONTACT VALIDATION
export const deleteContactValidationRules = [
    idRule,
    validateInput
];