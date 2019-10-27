const models = require('../models');
const Board = models.Board;
const Card = models.Card;
const Op = models.Sequelize.Op;

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

        Board.findOne({
            where: {
              id: {
                  [Op.eq]:boardId
              }
            },
            include: [{
                model: Card,
                as: 'cards',
                where: {
                    board_id: {
                        [Op.eq]: boardId
                    }
                },
                required: false
            }],
        })
            .then((board) => {
                if(board) {
                    res.json(board);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    getShareBoard(req, res) {
        let shareHash = req.headers.share_hash;

        Board.findOne({
            where: {
              share_hash: {
                  [Op.eq]: shareHash
              }
            },
            include: [{
                model: Card,
                as: 'cards',
                where: {
                    board_id: {
                        [Op.col] : 'Board.id'
                    }
                },
                required: false,
            }],
        })
            .then((board) => {
                if(board) {
                    res.json(board);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400);
            });
    },

    removeBoard(req, res) {
        let boardId = req.query.board_id;

        Board.destroy({where: {id: boardId}})
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    },

    changeBoardTitle(req, res) {
        let boardId = req.body.id;
        let title = req.body.title;

        Board.update({title},
            {where: {id: boardId}})
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    },

    changeBoardLink(req, res) {
        let boardId = req.body.id;
        let shareLink = req.body.shareLink;

        Board.update({share_hash: shareLink},
            {where: {id: boardId}})
            .then(data => {
                res.json(data);
            })
            .catch(() => {
                res.status(400);
            });
    }
};


