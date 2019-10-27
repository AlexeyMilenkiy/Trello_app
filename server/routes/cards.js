const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { body, query } = require('express-validator');
const { validate } = require('../services/validator');

router.post('/create',validate([
    body('board_id')
        .not().isEmpty()
        .isNumeric(),
    body('table_id')
        .not().isEmpty()
        .isNumeric(),
    body('position')
        .not().isEmpty()
        .isNumeric(),
    body('title')
        .not().isEmpty()
        .trim()
        .isLength({ min: 1, max: 200 }),
]),controller.cards.createCard);

router.put('/update',validate([
    body('id')
        .not().isEmpty()
        .isNumeric(),
    body('board_id')
        .not().isEmpty()
        .isNumeric(),
    body('table_id')
        .not().isEmpty()
        .isNumeric(),
    body('position')
        .not().isEmpty()
        .isNumeric(),
    body('title')
        .not().isEmpty()
        .trim()
        .isLength({ min: 1, max: 200 }),
    body('description')
        .if(body('description')
            .exists({
            checkNull: true,
        }))
        .trim()
        .isLength({ min: 0, max: 400 }),
]),controller.cards.updateCard);

router.delete('/delete',validate([
    query('card_id')
        .not().isEmpty()
        .isNumeric(),
]),controller.cards.deleteCard);

module.exports = router;


