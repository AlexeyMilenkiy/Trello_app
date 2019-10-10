const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    let secretKey = process.env.JWT_SECRET;
    let token = req.headers.auth_token;

    jwt.verify(token, secretKey, (err, decoded) => {

        if(decoded) {
            next();
        } else {
            res.status(401).send('token_invalid');
        }
    });
};

module.exports = checkToken;
