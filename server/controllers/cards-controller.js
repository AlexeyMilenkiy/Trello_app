const models = require('../models');
const Card = models.Card;

module.exports = {

    createCard(req, res) {
        let card = req.body.card;

        Card.create({...card})
            .then(data => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err)
                res.status(400);
            });
    },
};


