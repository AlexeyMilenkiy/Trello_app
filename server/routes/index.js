const express = require('express');
const router = express.Router();

const auth = require('./auth');
const checkToken = require('../services/checkToken');

router.use('/auth', auth);
router.use('/boards', checkToken, (req, res) => {
    res.sendStatus(200)
});

module.exports = router;

