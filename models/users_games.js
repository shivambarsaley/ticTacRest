'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_games = sequelize.define('users_games', {
    moveset: DataTypes.JSON,
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    result: { type: DataTypes.STRING, validate: {isIn: [['WON','LOST','DRAW']]}},
  }, {});
  users_games.associate = function(models) {
    users_games.belongsTo(models.game,{foreignKey: 'game_id', targetKey: 'id'});
    users_games.belongsTo(models.user,{foreignKey: 'user_id', targetKey: 'id'});

  };
  return users_games;
};
