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
    body('password').isLength({ min: 8 }),
    authController.login
)

module.exports = router;