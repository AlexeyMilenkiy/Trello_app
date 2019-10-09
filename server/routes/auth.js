const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { body } = require('express-validator');
const { validate } = require('../services/validator');

router.post('/sign-up', validate([
    body('name')
        .not().isEmpty()
        .trim()
        .isLength({ min: 2, max: 50 }),
    body('email')
        .isEmail()
        .normalizeEmail()
        .isLength({ min: 6, max: 50 }),
    body('password').isLength({ min: 8, max: 50 })
]), controller.register);


router.post('/sign-in', validate([
    body('email')
        .isEmail()
        .normalizeEmail()
        .isLength({ min: 6, max: 50 }),
    body('password')
        .isLength({ min: 8, max: 50})
]), controller.login);

module.exports = router;
