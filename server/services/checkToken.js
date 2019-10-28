const {OAuth2Client} = require('google-auth-library');
let CLIENT_ID = null;
const client = new OAuth2Client(CLIENT_ID);
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers.auth_token;
    const decodedToken = jwt.decode(token);

    if (decodedToken.isDefaultToken) {
        verifyDefaultToken(token, res, next)
    } else {
        verifyGoogleToken(token, res, next)
    }
};

const verifyDefaultToken = (token, res, next) => {
    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, decoded) => {

        if (decoded) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
};

const verifyGoogleToken  = async (token, res, next) => {
    try {
        const decodedToken = jwt.decode(token);
        CLIENT_ID = decodedToken.aud;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        if(ticket) {
            next()
        }
    } catch (err) {
        res.sendStatus(401);
    }
};

const decodeGoogleToken = async (req, res, next) => {
    const idToken = req.body.token;

    try {
        const decodedToken = jwt.decode(idToken);
        CLIENT_ID = decodedToken.aud;
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();

        req._user_name = payload.name;
        req._user_email = payload.email;
        req._user_token = idToken;
        next();

    } catch (err) {
        res.sendStatus(401);
    }
};

module.exports = {checkToken, decodeGoogleToken};
