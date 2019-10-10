const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { body } = require('express-validator');
const { validate } = require('../services/validator');

router.post('/create', validate([
    body('id')
        .not().isEmpty()
        .isNumeric(),
    body('title')
        .not().isEmpty()
        .trim()
        .isLength({ min: 1, max: 50 }),
]), controller.boards.createBoard);

module.exports = router;
