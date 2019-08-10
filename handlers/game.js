const dbHelper = require('../helpers/dbHelpers');
const gameHelper = require('../helpers/gameHelper');
const getGameWithId = (id) => {
  return dbHelper.getGame(id);
};

const startGame = async (player_id, size) => {
  const boardSize = size*size;
  const availableGame = await dbHelper.findAvailableGame(boardSize);
  const moveset = new Array(boardSize);
  moveset.fill(0);
  if (availableGame) {
    const {id} = availableGame;
    await Promise.all([
      dbHelper.joinGame(id, player_id, moveset),
      dbHelper.beginGame(id)
    ]);
    return {gameId: id}
  }
  const newGame = await dbHelper.createGame(boardSize);
  console.log(newGame);
  return dbHelper.joinGame(newGame.id, player_id, moveset)
};

const playMove = async (playerId, gameId, move) => {
  const allPlayerMoves = await dbHelper.getMovesForGame(gameId);
  const currentPlayerMoves = allPlayerMoves.find((playerMove) => playerMove.user_id === playerId);
  console.log(allPlayerMoves, currentPlayerMoves);
  const [player1Moves, player2Moves] = allPlayerMoves.map((playerMove) => playerMove.moveset);
  console.log(player1Moves, player2Moves);
  const combinedMoves = player1Moves.map((value, index) => value || player2Moves[index]);
  console.log(combinedMoves);
  if(combinedMoves[move]){
    return 'BAD MOVE'
  }
  currentPlayerMoves.moveset[move] = 1;
  return  dbHelper.updateMoveset(playerId, gameId, currentPlayerMoves.moveset);
};

module.exports = {
  getGameWithId, startGame, playMove
};
