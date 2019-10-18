const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const { body, header } = require('express-validator');
const { validate } = require('../services/validator');


router.post('/create', controller.cards.createCard);

router.get('/get-cards', controller.cards.getCards);


module.exports = router;


