const models = require('../models');
const Board = models.Board;
const Card = models.Card;

module.exports = {

    createBoard(req, res) {
        let board = req.body;

        Board.create({title: board.title, author_id: board.author_id})
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    },

    getBoards(req, res) {
        let userId = req.headers.author_id;

        Board.findAll({where: {author_id: userId}})
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    },

    getBoard(req, res) {
        let boardId = req.headers.board_id;
        console.log(boardId);

        Board.findOne({
            include: {
                model: Card,
                as: 'cards'
            }
        }, {
            where:
                {id: boardId}
        })
            .then((board) => {
                res.json(board);
            })
            .catch(() => {
                res.status(400);
            });
    },

    removeBoard(req, res) {
        let boardId = req.headers.board_id;

        Board.destroy({where: {id: boardId}})
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    }
};


