const models = require('../models');
const Card = models.Card;
const Op = models.Sequelize.Op;

module.exports = {

    getCard(req, res) {
        const cardId = req.query.card_id;

        Card.findOne(
            {
                where: {
                    id: {
                        [Op.eq]: cardId
                    }
                }
            }
        )
            .then((card) => {
                res.json(card);
            })
            .catch(() => {
                res.status(400);
            });
    },

    createCard(req, res) {
        const card = req.body;

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
        const card = req.body;

        Card.update(
            {...card},
            {
                where: {
                    id: {
                        [Op.eq]: card.id
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
        const cardId = req.query.card_id;
        console.log(cardId);

        Card.destroy(
            {
                where: {
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
