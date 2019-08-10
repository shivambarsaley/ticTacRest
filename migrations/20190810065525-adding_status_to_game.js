'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('games', 'status', {type: Sequelize.STRING})
      .then(() => queryInterface.addConstraint('games', ['status'], {
        type: 'check',
        where: {
          status: ['INIT', 'IN_PROGESS', 'CONCLUDED']
        }
      }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('games', 'status');
  }
};
