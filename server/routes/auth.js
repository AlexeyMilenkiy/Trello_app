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
]), controller.auth.registerUser);


router.post('/sign-in', validate([
    body('email')
        .isEmail()
        .normalizeEmail()
        .isLength({ min: 6, max: 50 }),
    body('password')
        .isLength({ min: 8, max: 50})
]), controller.auth.loginUser);

router.post('/google-auth', validate([
    body('email')
        .isEmail()
        .normalizeEmail()
        .isLength({ min: 6, max: 50 }),
    body('name')
        .not().isEmpty()
        .trim()
        .isLength({ min: 2, max: 50 }),
]), controller.auth.socialAuth);

module.exports = router;
