const handler = require('../handlers/users');
const joiSchema = require('../joi/users');
module.exports = [
  {
    method: 'GET',
    path: '/users',
    options: {
      validate: {
        query: joiSchema.getUserScheme
      }
    },
    handler: (request, h) => {
      const {email} = request.query;
      return handler.findUser(email)
    }
  },
  {
    method: 'POST',
    path: '/users',
    options: {
      validate: {
        payload: joiSchema.createUserScheme
      }
    },
    handler: (request, h) => {
      const body = request.payload;
      return handler.createUser(body)
    }
  }
];
