'use strict';
module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        board_id: DataTypes.INTEGER,
        table_id: DataTypes.INTEGER,
        position: DataTypes.DECIMAL
    }, {
        underscored: true,
        tableName: 'Cards'
    });
    Card.associate = function (models) {

        Card.belongsTo(models.Board, {
            foreignKey: 'board_id',
        });
    };

    return Card;
};
