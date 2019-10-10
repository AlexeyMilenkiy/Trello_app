const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_SECRET;

const createToken = (activeUser) => {
    const exp = Math.floor(Date.now() / 1000) + (60 * 60);

    return jwt.sign({exp, ...activeUser}, privateKey)
};

module.exports = { createToken, privateKey };
