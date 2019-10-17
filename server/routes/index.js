const express = require('express');
const router = express.Router();

const auth = require('./auth');
const boards = require('./boards');
const cards = require('./cards');
const checkToken = require('../services/checkToken');

router.use('/auth', auth);
router.use('/boards', checkToken, boards);
router.use('/cards', checkToken, cards);

module.exports = router;

