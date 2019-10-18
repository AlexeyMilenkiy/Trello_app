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
        .isLength({ min: 1, max: 200 }),
]), controller.boards.createBoard);

router.delete('/remove-board', validate([
    header('board_id')
        .not().isEmpty()
]), controller.boards.removeBoard);

router.get('/get-board', validate([
    header('board_id')
        .not().isEmpty()
]), controller.boards.getBoard);

router.put('/change-board-title', validate([
    body('id')
        .not().isEmpty()
        .isNumeric(),
    body('title')
        .not().isEmpty()
        .trim()
        .isLength({ min: 1, max: 200 }),
]), controller.boards.changeBoardTitle);

module.exports = router;
