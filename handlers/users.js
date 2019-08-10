const dbHelper = require('../helpers/dbHelpers');
const findUser = (email) => {
  return dbHelper.findUser(email);
};

const createUser = (properties) => dbHelper.createUser(properties);

module.exports = {findUser, createUser};
