const { body, param, validationResult } = require('express-validator');

const createTempleValidationRules = () => {
    return [
        body('temple_id').optional().trim().isNumeric().withMessage('temple id is not required but should be a number if supplied'),
        body('additionalInfo').optional().trim().isBoolean().withMessage('additional info is not required but should be a boolean'),
        body('name').trim().isString().withMessage('The name must be a string and its required'),
        body('location').trim().isString().withMessage('Favourite colour is required and should be a string'),
        body('dedicated').trim().isString().withMessage('The dedicated can either be a string date an anounced statement'),
    ];
};

const updateTempleValidationRules = () => {
    return [
        param('id').trim().isMongoId().withMessage('Invalid ID format'),
        body('temple_id').optional().trim().isNumeric().withMessage('temple id is not required but should be a number if supplied'),
        body('additionalInfo').optional().trim().isBoolean().withMessage('additional info is not required but should be a boolean'),
        body('name').trim().isString().withMessage('The name must be a string and its required'),
        body('location').trim().isString().withMessage('Favourite colour is required and should be a string'),
        body('dedicated').trim().isString().withMessage('The dedicated can either be a string date an anounced statement'),
    ];
};

const getOneTempleValidationRules = () => {
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
    createTempleValidationRules,
    updateTempleValidationRules,
    getOneTempleValidationRules,
    validate,
};
