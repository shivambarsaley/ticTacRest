const Joi = require('joi');
const startGame = Joi.object().keys({
  playerId: Joi.number().required(),
  size: Joi.number().min(3).required()
});

const moveGame = Joi.object().keys({
  playerId: Joi.number().required(),
  gameId: Joi.number().required(),
  moves: Joi.number().required(),
});

const concludeGame = Joi.object().keys({
  playerStatus: Joi.array().items(Joi.object().keys({
    playerId: Joi.number().required(),
    status: Joi.string().valid(['WON','LOST','DRAW']).required()
  })),
  gameId: Joi.number().required()
});

module.exports = {startGame, moveGame, concludeGame };
