
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { createUserValidationRules, updateUserValidationRules, getOneUserValidationRules, validate } = require('../validation/userValidator');
const { AppError } = require('../helper/error');
const {asyncHandler} =  require ('../helper/error')


router.get('/homepage', controller.homePage);
router.get('/getAll', controller.getAllUsers);
router.get('/getOne/:id', getOneUserValidationRules(), validate, asyncHandler( controller.getOneUser));
router.post('/update/:id', updateUserValidationRules(), validate, asyncHandler(controller.updateUsers));
router.post('/create', createUserValidationRules(), validate, asyncHandler(controller.createUsers));
router.delete('/delete/:id', getOneUserValidationRules(), validate,asyncHandler(controller.deleteUser));
router.delete('/deleteAll', getOneUserValidationRules(), validate,asyncHandler(controller.deleteUser));


router.all("*", (req, res, next) => {
    next(new AppError(`This path ${req.originalUrl} isn't on this server!`, 404));
    });
module.exports = router;
