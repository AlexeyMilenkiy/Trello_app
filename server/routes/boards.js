const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { body, header } = require('express-validator');
const { validate } = require('../services/validator');

router.get('/get-boards', validate([
    header('author_id')
        .not().isEmpty()
]), controller.boards.getBoards);

router.post('/create', validate([
    body('author_id')
        .not().isEmpty()
        .isNumeric(),
    body('title')
        .not().isEmpty()
        .trim()
        .isLength({ min: 1, max: 50 }),
]), controller.boards.createBoard);

router.delete('/remove-board', validate([
    header('board_id')
        .not().isEmpty()
]), controller.boards.removeBoard);

router.get('/get-board', validate([
    header('board_id')
        .not().isEmpty()
]), controller.boards.getBoard);


module.exports = router;


