const getLeadingPlayer = (player1Moves, player2Moves) => player1Moves.length > player2Moves.length
  ? player1Moves : player2Moves;

module.exports = { getLeadingPlayer };
