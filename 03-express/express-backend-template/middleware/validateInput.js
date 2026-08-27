import { validationResult } from 'express-validator';

export const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array({ onlyFirstError: true }).map(err => ({
            field: err.path,
            message: err.msg
        }));

        return res.status(400).json({
            success: false,
            statusCode: 400,
            status: 'fail',
            message: "Validation failed",
            errors: extractedErrors
        });
    }
    return next();
};