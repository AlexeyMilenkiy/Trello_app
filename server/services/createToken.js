require('dotenv').config();
const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_SECRET;

const createToken = (activeUser) => {
    return jwt.sign({ ...activeUser, isDefaultToken: 'true' }, privateKey, { expiresIn: '1d' });
};

module.exports = createToken;
