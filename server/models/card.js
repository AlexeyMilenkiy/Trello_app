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
        tableName: 'cards'
    });
    Card.associate = function (models) {

        Card.belongsTo(models.Board, {
            foreignKey: 'board_id',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        });
    };

    return Card;
};
