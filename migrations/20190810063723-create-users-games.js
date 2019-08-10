'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moveset: {
        type: Sequelize.JSON
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'games',
          },
          key: 'id'
        },
        allowNull: false
      },
      result: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('users_games',['result'],{
      type: 'check',
      where: {
        result: ['DRAW', 'WON', 'LOST']
      }
    }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_games');
  }
};
