const express = require('express')
const authController = require('../controllers/auth');
const { body } = require('express-validator');

const router = express.Router();

router.post(
    '/register',
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('account_type').isInt({min:0, max:1}),
    authController.register
);

router.post(
    '/login',
    body('email').isString(),
    body('password').isLength({ min: 8 }).withMessage("Password length must be greater than equal to 8"),
    authController.login
);

router.post(
    '/forgot_password',
    body('email').isString(),
    authController.forgotPassword,
);

router.post(
    '/set_password',
    body('new_password').isLength({ min: 8 }),
    body('confirm_password').isLength({ min: 8 }),
    body('token_link').exists(),
    authController.resetPassword,
);


module.exports = router;