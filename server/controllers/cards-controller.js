const models = require('../models');
const Card = models.Card;

module.exports = {

    createCard(req, res) {
        let card = req.body.card;

        Card.create({...card})
            .then((data) => {
                data.position = Number(data.position);
                res.json(data);
            })
            .catch((err) => {
                console.log(err)
                res.status(400);
            });
    },

    getCards(req, res) {
        let tableId = req.headers.table_id;
        let boardId = req.headers.board_id;

        Card.findAll({where: {
                table_id : tableId,
                board_id: boardId
            }})
            .then((cards) => {
                res.json(cards);
            })
            .catch((err) => {
                console.log(err);
                res.status(404);
        })
    }
};


