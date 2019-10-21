const models = require('../models');
const Card = models.Card;
const Op = models.Sequelize.Op;

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

    updateCard(req, res) {
        let card = req.body;

        Card.update(
            {...card},
            { where: {
                id: {
                    [Op.eq]:card.id
                }
            }
            })
            .then((data) => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    },

    deleteCard(req, res) {
        let cardId = req.headers.card_id;

        Card.destroy(
            { where: {
                id: {
                    [Op.eq]: cardId
                }
            }
            })
            .then((data) => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    }
};
