const createHash = require('../services/createHash');
const checkHash = require('../services/checkHash');
const createToken = require('../services/createToken');
const models = require('../models');
const User = models.User;

module.exports = {

    registerUser (req, res) {
        let user = req.body;
        user.password = createHash(user.password);

        User.create({ ...user })
            .then(data => {
                res.json({
                    name: data.name,
                    id: data.id,
                    token: createToken({name, id})
                });
            })
            .catch(() => {
                res.status(401).send('email_registered');
            });
    },

    loginUser (req, res) {
        let user = req.body;

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
                res.sendStatus(401);
            });
    },

    socialAuth (req, res) {
        let user = req.body;

        User.findOrCreate({where: {email: user.email, name: user.name}})
            .then(data => {
                res.json({
                    name: data[0].name,
                    id: data[0].id,
                    token: user.token
                });
            })
            .catch(() => {
                res.sendStatus(401);
            });
    },
};


