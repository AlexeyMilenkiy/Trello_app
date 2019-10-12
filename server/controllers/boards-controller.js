const models = require('../models');
const Board = models.Board;

module.exports = {

    createBoard (req, res) {
        let board = req.body;

        Board.create({ title: board.title, author_id: board.author_id })
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    },

    getBoards (req, res) {
        let userId = req.headers.author_id;

        Board.findAll({where: { author_id: userId }})
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    }
};

