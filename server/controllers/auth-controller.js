const createHash = require('../services/createHash');
const checkHash = require('../services/checkHash');
const service = require('../services/createToken');
const models = require('../models');
const User = models.User;

module.exports = {

    registerUser (req, res) {
        let user = req.body;
        user.password = createHash(user.password);

        User.create({ ...user })
            .then(data => {
                let activeUser = {name: data.name, id: data.id};
                res.json([activeUser.name, activeUser.id, service.createToken(activeUser)]);
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
                } else {
                    let isHash = checkHash(user.password, data.password);
                    if (isHash) {
                        let activeUser = {name: data.name, id: data.id};
                        res.json([activeUser.name, activeUser.id, service.createToken(activeUser)]);
                    } else {
                        res.status(401).send('invalid_password');
                    }
                }
            })
            .catch(() => {
                res.sendStatus(401);
            });
    },
}


