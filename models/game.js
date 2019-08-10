'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    size: { type: DataTypes.INTEGER, allowNull: false},
    startTime: { type: DataTypes.DATE, allowNull: false},
    status: { type: DataTypes.STRING, validate: { isIn: [['INIT', 'IN_PROGESS', 'CONCLUDED']]}}
  }, {
  });
  game.associate = function(models) {
    // associations can be defined here
  };
  return game;
};
