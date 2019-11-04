'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('boards', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                title: {
                    type: Sequelize.STRING
                },
                author_id: {
                    type: Sequelize.INTEGER
                },
                share_hash: {
                    type: Sequelize.STRING
                },
            },
            {
                underscored: true,
                tableName: 'boards'
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('boards');
    }
};
