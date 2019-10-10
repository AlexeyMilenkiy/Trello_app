const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    let secretKey = process.env.JWT_SECRET;
    let token = req.headers.authorization || req.cookies.authToken;

    jwt.verify(token, secretKey, (err, decoded) => {

        if(decoded) {
            res.sendStatus(200);
        } else if(decoded) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
};

module.exports = checkToken;
