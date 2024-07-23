const { body, param, validationResult } = require('express-validator');

const createUserValidationRules = () => {
    return [
        body('firstName').trim().isString().notEmpty().withMessage('First Name is required and should be a string'),
        body('lastName').trim().isString().notEmpty().withMessage('Last Name is required and should be a string'),
        body('email').trim().isEmail().withMessage('Valid email is required'),
        body('favouriteColor').trim().isString().withMessage('Favourite colour is required and should be a string'),
        body('birthday').trim().isDate().withMessage('Birthday is required and should be a valid date'),
    ];
};

const updateUserValidationRules = () => {
    return [
        param('id').trim().isMongoId().withMessage('Invalid ID format'),
        body('firstName').optional().trim().isString().withMessage('First Name should be a string'),
        body('lastName').optional().trim().isString().withMessage('Last Name should be a string'),
        body('email').optional().trim().isEmail().withMessage('Valid email is required'),
        body('favouriteColor').optional().trim().isString().withMessage('Favourite colour should be a string'),
        body('birthday').optional().trim().isDate().withMessage('Birthday should be a valid date'),
    ];
};

const getOneUserValidationRules = () => {
    return [
        param('id').trim().isMongoId().withMessage('Invalid ID format'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createUserValidationRules,
    updateUserValidationRules,
    getOneUserValidationRules,
    validate,
};
