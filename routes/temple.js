
const express = require('express');
const router = express.Router();
const controller = require('../controllers/templeController');
const { createTempleValidationRules, updateTempleValidationRules, getOneTempleValidationRules, validate } = require('../validation/templeValidator');
const { AppError } = require('../helper/error');
const {asyncHandler} =  require ('../helper/error')


router.get('/getAll', controller.getAllTemples);
router.get('/getOne/:id', getOneTempleValidationRules(), validate, asyncHandler( controller.getOneTemple));
router.put('/update/:id', updateTempleValidationRules(), validate, asyncHandler(controller.updateTemple));
router.post('/create', createTempleValidationRules(), validate, asyncHandler(controller.createTemples));
router.delete('/delete/:id', getOneTempleValidationRules(), validate,asyncHandler(controller.deleteTemple));

router.all("*", (req, res, next) => {
    next(new AppError(`This path ${req.originalUrl} isn't on this server!`, 404));
    });
module.exports = router;
