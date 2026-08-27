

import { body, validationResult } from 'express-validator';



export const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array({ onlyFirstError: true }).map(err => {
            return {
                field: err.path,
                message: err.msg
            }
        })

        return res.status(400).json({
            success: false,
            statusCode: 400,
            status: 'fail',
            message: "Validation failed",
            errors: extractedErrors
        })


    }
    return next();

}



export const registerValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage("Name is required").bail()
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters")
        .toLowerCase(),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage('Password must be 8+ chars with uppercase, lowercase, number & symbol'),

    validateInput
];



export const loginValidationRules = [
    body('email')
        .trim()
        .notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),


    body('password')
        .notEmpty().withMessage('Password is required'),


    validateInput
]