'use strict';
module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        title: DataTypes.STRING,
        author_id: DataTypes.INTEGER,
        share_hash: DataTypes.STRING
    }, {
        underscored: true,
        tableName: 'boards'
    });
    Board.associate = function (models) {

        Board.belongsTo(models.User, {
            foreignKey: 'author_id',
        });

        Board.hasMany(models.Card, {
            foreignKey: 'board_id',
            as: 'cards',
        });
    };

    return Board;
};
