'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            board_id: {
                type: Sequelize.INTEGER
            },
            table_id: {
                type: Sequelize.INTEGER
            },
            position: {
                type: Sequelize.DECIMAL
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cards');
    }
};
