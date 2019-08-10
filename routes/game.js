const handler = require('../handlers/game');
const joiSchema = require('../joi/game');
module.exports = [
  {
    method: 'GET',
    path: '/games/{id}',
    handler: (request, h) => {
      const { id } = request.params;
      return handler.getGameWithId(id);
    }
  },
  {
    method: 'POST',
    path: '/games/start',
    options: {
      validate: {
        payload: joiSchema.startGame
      }
    },
    handler: (request, h) => {
      const { payload: {playerId, size}} = request;
      return handler.startGame(playerId, size).catch(console.log);
    }
  },
  {
    method: 'POST',
    path: '/games/move',
    options: {
      validate: {
        payload: joiSchema.moveGame
      }
    },
    handler: (request) => {
      const { playerId, moves, gameId} = request.payload;
      return handler.playMove(playerId, gameId, moves);
    }
  },
  {
    method: 'PATCH',
    path: '/game/conclude',
    options: {
      validate: {
        payload: joiSchema.concludeGame
      }
    },
    handler: (request) => {
      const { playerStatus, gameId } = request.payload;
      return handler.concludeGame(gameId, playerStatus)
    }
  }
];
