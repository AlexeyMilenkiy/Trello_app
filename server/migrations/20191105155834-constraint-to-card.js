'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('cards', ['board_id'], {
        type: 'foreign key',
        name: 'fk_card',
        references: {
          table: 'boards',
          field: 'id'
        },
        onDelete: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('cards', 'fk_card');
  }
};
