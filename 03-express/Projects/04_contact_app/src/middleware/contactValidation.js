import { body, param, validationResult } from "express-validator"




export const validateInput = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array({ onlyFirstError: true }).map(err => ({
            field: err.path,
            message: err.msg
        }))

        return res.status(400).json({
            success: false,
            statusCode: 400,
            status: 'fail',
            message: "Validation failed",
            errors: extractedErrors
        })


    }

    return next()

}


// 2. REUSABLE ID RULE (Bina validateInput middleware ke)
const idRule = param('id')
    .isMongoId().withMessage("❌ Invalid Contact ID format!");


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

    validateInput
];

// 5. DELETE CONTACT VALIDATION
export const deleteContactValidationRules = [
    idRule,
    validateInput
];