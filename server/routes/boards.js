const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { body, header } = require('express-validator');
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

router.get('/get-boards', validate([
    header('id')
        .not().isEmpty()
]), controller.boards.getBoards);

module.exports = router;
