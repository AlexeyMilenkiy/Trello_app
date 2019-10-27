const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { body, query } = require('express-validator');
const { validate } = require('../services/validator');

router.get('/get-boards', validate([
    query('author_id')
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
    query('board_id')
        .not().isEmpty()
]), controller.boards.removeBoard);

router.get('/get-board', validate([
    query('board_id')
        .not().isEmpty()
]), controller.boards.getBoard);

router.get('/get-share-board', validate([
    query('share_hash')
        .isHash("md5")
]), controller.boards.getShareBoard);

router.put('/change-board-title', validate([
    body('id')
        .not().isEmpty()
        .isNumeric(),
    body('title')
        .not().isEmpty()
        .trim()
        .isLength({ min: 1, max: 200 }),
]), controller.boards.changeBoardTitle);

router.put('/change-board-link', validate([
    body('id')
        .not().isEmpty()
        .isNumeric(),
    body('shareLink')
        .if(body('shareLink')
            .exists({
                checkNull: true,
            }))
        .isHash("md5")
]), controller.boards.changeBoardLink);

module.exports = router;
