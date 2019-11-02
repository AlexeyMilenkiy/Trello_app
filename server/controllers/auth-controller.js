const createHash = require('../services/createHash');
const checkHash = require('../services/checkHash');
const createToken = require('../services/createToken');
const models = require('../models');
const User = models.User;

module.exports = {

    registerUser (req, res) {
        const user = req.body;
        user.password = createHash(user.password);

        User.create({ ...user })
            .then(data => {
                res.json({
                    name: data.name,
                    id: data.id,
                    token: createToken({name: data.name, id: data.id})
                });
            })
            .catch(() => {
                res.status(401).send('email_registered');
            });
    },

    loginUser (req, res) {
        const user = req.body;

        User.findOne({where: {email: user.email}})
            .then(data => {
                if(!data){
                    res.status(401).send('invalid_email')
                } else if(data.password === null) {
                    res.status(401).send('password_null')
                } else {
                    let isHash = checkHash(user.password, data.password);
                    if (isHash) {
                        res.json({
                                name: data.name,
                                id: data.id,
                                token: createToken({name: data.name, id: data.id})
                        });
                    } else {
                        res.status(401).send('invalid_password');
                    }
                }
            })
            .catch(() => {
                res.sendStatus(400);
            });
    },

    socialAuth (req, res) {
        const userName = req._user_name;
        const userEmail = req._user_email;
        const token = req._user_token;

        User.findOrCreate({where: {email: userEmail, name: userName}})
            .then(data => {
                res.json({
                    name: data[0].name,
                    id: data[0].id,
                    token: token
                });
            })
            .catch(() => {
                res.sendStatus(400);
            });
    },
};


