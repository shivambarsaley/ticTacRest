'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    size: { type: DataTypes.INTEGER, allowNull: false},
    startTime: { type: DataTypes.DATE, allowNull: false},
    status: { type: DataTypes.STRING, validate: { isIN: [['INIT', 'IN_PROGESS', 'CONCLUDED']]}}
  }, {
  });
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
