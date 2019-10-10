const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_SECRET;

const createToken = (activeUser) => {
    return jwt.sign({ ...activeUser }, privateKey, { expiresIn: '1min' });
};

module.exports = createToken;
