const Joi = require('joi');
const createUserScheme = Joi.object().keys({
  email: Joi.string().email().required()
});

const getUserScheme = Joi.object().keys({
  id: Joi.number(),
  email: Joi.string().email().required()
}).xor('id', 'email');

module.exports = {createUserScheme, getUserScheme};
