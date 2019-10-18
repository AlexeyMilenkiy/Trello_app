const models = require('../models');
const Card = models.Card;

module.exports = {

    createCard(req, res) {
        let card = req.body;

        Card.create({...card})
            .then((data) => {
                data.position = Number(data.position);
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    },

};


