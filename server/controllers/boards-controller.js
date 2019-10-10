const models = require('../models');
const Board = models.Board;

module.exports = {

    createBoard (req, res) {
        let board = req.body;

        Board.create({ title: board.title, author_id: board.id })
            .then(data => {
                console.log(data)
                res.json(data);
                // res.json({
                //     name: data.name,
                //     id: data.id,
                // });
            })
            .catch(() => {
                res.status(400);
            });
    },
};


