const Model = require('../models');
const getGame = (id) => {
  return Model.users_games.findOne({
    where: {game_id: id},
    include: {
      model: Model.game
    }
  }).catch((e) => {
    console.log(e);
  })
};

const findAvailableGame = (size) => {
  return Model.game.findOne({
    where: {
      size,
      status: 'INIT'
    }
  })
};

const joinGame = (gameId, playerId, moveSet) => {
  return Model.users_games.create({
    game_id: gameId,
    user_id: playerId,
    moveset: moveSet
  })
};

const beginGame = (id) => {
  return Model.game.update({
    status: 'IN_PROGESS'
  }, {
    where: {
      id
    }
  })
};

const createGame = (size) => {
  return Model.game.create({
    size,
    startTime: Date.now(),
    status: 'INIT'
  })
};

const getMovesForGame = (gameId) => {
  return Model.users_games.findAll({
    where: {game_id: gameId, result: null},
    attributes: ['user_id', 'moveset'],
    raw: true
  })
};

const findUser = (email) => {
  return Model.users.findOne({where: {email}});
};

const createUser = (params) => {
  console.log(params);
  return Model.users.create(params);
};

const updateMoveset = (playerId, gameId, moveset) => {
  return Model.users_games.update({moveset}, {
    where: {
      user_id: playerId,
      game_id: gameId
    }
  })
};

module.exports = {
  getGame, findAvailableGame, joinGame,
  beginGame, createGame, findUser,
  createUser, getMovesForGame, updateMoveset
};
