'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  },
   {
     underscored : true,
     tableName: 'Boards'
   });
  Board.associate = function(models) {

    Board.belongsTo(models.User, {
        foreignKey: 'author_id',
    });

    Board.hasMany(models.Card, {
        foreignKey: 'board_id',
        as: 'cards'
    });
  };

  return Board;
};
