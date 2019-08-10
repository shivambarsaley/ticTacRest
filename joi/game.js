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

module.exports = {startGame, moveGame };
