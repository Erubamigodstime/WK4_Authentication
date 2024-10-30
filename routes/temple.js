
const express = require('express');
const router = express.Router();
const controller = require('../controllers/templeController');
const { createTempleValidationRules, updateTempleValidationRules, getOneTempleValidationRules, validate } = require('../validation/templeValidator');
const { AppError } = require('../helper/error');
const {asyncHandler} =  require('../helper/error')
const {ensureAuth} = require('../helper/authHelper')


router.get('/getAll', ensureAuth, controller.getAllTemples);
router.get('/getOne/:id', ensureAuth, getOneTempleValidationRules(), validate, asyncHandler( controller.getOneTemple));
router.put('/update/:id', ensureAuth, updateTempleValidationRules(), validate, asyncHandler(controller.updateTemple));
router.post('/create', ensureAuth, createTempleValidationRules(), validate, asyncHandler(controller.createTemples));
router.delete('/delete/:id', ensureAuth, getOneTempleValidationRules(), validate,asyncHandler(controller.deleteTemple));


router.all("*", (req, res, next) => {
    next(new AppError(`This path ${req.originalUrl} isn't on this server!`, 404));
    });
module.exports = router;
