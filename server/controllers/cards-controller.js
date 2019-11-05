const models = require('../models');
const Card = models.Card;
const Board = models.Board;
const Op = models.Sequelize.Op;
const Pusher = require('pusher');

const channels_client = new Pusher({
    appId: '894091',
    key: 'a18db759af1623ba4ed2',
    secret: '114b9abff9702954c63a',
    cluster: 'eu',
    encrypted: true
});


module.exports = {

    getCard(req, res) {
        const cardId = req.query.card_id;

        Card.findOne({
                where: {
                    id: {
                        [Op.eq]: cardId
                    }
                }
            })
            .then((card) => {
                if (card) {
                    res.json(card);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(() => {
                res.sendStatus(400);
            });
    },

    createCard(req, res) {
        const card = req.body;

        Board.findOne({
            where: {
                id: {
                    [Op.eq]: card.board_id
                }
            }})
            .then( (board) => {
                if(board) {
                    Card.create({...card})
                        .then((data) => {
                            data.position = Number(data.position);
                            res.send({});
                            const newCard = JSON.stringify(data.dataValues);
                            channels_client.trigger('cards-channel', 'new-card', {
                                "card": `${newCard}`
                            });
                        })
                        .catch(() => {
                            res.sendStatus(400);
                        });
                } else {
                    res.status(404).send('board_not_found');
                }
            })
            .catch(() => {
                res.sendStatus(400);
            })
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
                if(data[0] === 0) {
                    res.sendStatus(404);
                } else {
                    res.send({});
                    const changedCard = JSON.stringify(card);
                    channels_client.trigger('cards-channel', 'edit-card', {
                        "card": `${changedCard}`
                    });
                }
            })
            .catch(() => {
                res.sendStatus(400);
            });
    },

    deleteCard(req, res) {
        const cardId = req.query.card_id;

        Card.destroy({
                where: {
                    id: {
                        [Op.eq]: cardId
                    }
                }
            })
            .then((data) => {
                res.json(data);
                channels_client.trigger('cards-channel', 'delete-card', {
                    'card': `${cardId}`
                });
            })
            .catch(() => {
                res.sendStatus(400);
            });
    }
};
