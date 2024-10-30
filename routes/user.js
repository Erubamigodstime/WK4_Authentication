
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { createUserValidationRules, updateUserValidationRules, getOneUserValidationRules, validate } = require('../validation/userValidator');
const { AppError } = require('../helper/error');
const {asyncHandler} =  require ('../helper/error')
const {ensureAuth} =require('../helper/authHelper')


router.get('/getAll', ensureAuth, controller.getAllUsers);
router.get('/getOne/:id', ensureAuth, getOneUserValidationRules(), validate, asyncHandler( controller.getOneUser));
router.post('/update/:id', ensureAuth, updateUserValidationRules(), validate, asyncHandler(controller.updateUsers));
router.post('/create', ensureAuth, createUserValidationRules(), validate, asyncHandler(controller.createUsers));
router.delete('/delete/:id',ensureAuth, getOneUserValidationRules(), validate,asyncHandler(controller.deleteUser));
router.delete('/deleteAll', ensureAuth, getOneUserValidationRules(), validate,asyncHandler(controller.deleteUser));


router.all("*", (req, res, next) => {
    next(new AppError(`This path ${req.originalUrl} isn't on this server!`, 404));
    });
module.exports = router;
