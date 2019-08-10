const gameRoutes = require('./game');
const userRoutes = require('./users');

module.exports = [...gameRoutes, ...userRoutes];
