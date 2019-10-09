const express = require('express');
const router = module.exports = express.Router();

const loginRouter = require('./login-router');
const registerRouter = require('./register-router');

router.post('login', loginRouter);

router.post('sign-up', registerRouter);

module.exports = router;
