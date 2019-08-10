const dbHelper = require('../helpers/dbHelpers');
const gameHelper = require('../helpers/gameHelper');
const getGameWithId = (id) => {
  return dbHelper.getGame(id)
};

const startGame = async (player_id, size) => {
  const boardSize = size * size;
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
  return dbHelper.joinGame(newGame.id, player_id, moveset)
};

const playMove = async (playerId, gameId, move) => {
  const allPlayerMoves = await dbHelper.getMovesForGame(gameId);
  const currentPlayerMoves = allPlayerMoves.find((playerMove) => playerMove.user_id === playerId);
  const otherPlayer = allPlayerMoves.find((playerMove) => playerMove.user_id !== playerId);
  const [player1Moves, player2Moves] = allPlayerMoves.map((playerMove) => playerMove.moveset);
  if (!player1Moves || !player2Moves) {
    return {message: `Game  ${gameId} not found`}
  }
  const combinedMoves = player1Moves.map((value, index) => value || player2Moves[index]);
  if (combinedMoves[move] || move >= combinedMoves.length) {
    return {message: 'BAD MOVE'}
  }
  currentPlayerMoves.moveset[move] = 1;
  await dbHelper.updateMoveset(playerId, gameId, currentPlayerMoves.moveset);
  const isWin = gameHelper.isWin(currentPlayerMoves.moveset, currentPlayerMoves.moveset.length);
  const isDraw = gameHelper.isDraw(combinedMoves, combinedMoves.length);
  if (isWin) {
    await concludeGame(gameId, [
      {playerId, status: 'WON'},
      {playerId: otherPlayer.user_id, status: 'LOST'}
    ]);
    return {message: `GAME Concluded, Player ${playerId} won`};
  } else if (isDraw && !isWin) {
    await concludeGame(gameId, [
      {playerId, status: 'DRAW'},
      {playerId: otherPlayer.user_id, status: 'DRAW'}
    ]);
    return {message: `Game Concluded with a Draw`};
  }
  return {message: 'Moveset Updated', playerId, moveset: currentPlayerMoves.moveset}
};

const concludeGame = (gameId, playerStatus) => {
  return Promise.all([
    dbHelper.endGame(gameId),
    ...playerStatus.map((status) => dbHelper.updatePlayerStatusInGame(gameId, status))
  ]).then(() => ({
    gameId,
    status: 'Concluded'
  }))
};

module.exports = {
  getGameWithId, startGame,
  playMove, concludeGame
};
