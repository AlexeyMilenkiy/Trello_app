const express = require('express');
const router = express.Router();

const auth = require('./auth');
const boards = require('./boards');
const checkToken = require('../services/checkToken');

router.use('/auth', auth);
router.use('/boards', boards);

module.exports = router;

