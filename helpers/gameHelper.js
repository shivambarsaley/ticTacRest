// Assumes the currently playing player is player1;
const isWin = (playerMoves, size) => {
  const gridLength = size ** 0.5;
  let lengthWiseMatchCount = 0;
  let breathWiseMatchCount = 0;
  let primaryDiagonalWiseMatchCount = 0;
  let secondaryDiagonalWiseMatchCount = 0;
  for(let length = 0; length < gridLength; length ++ ){
    for(let breath = 0; breath < gridLength; breath ++){
      const lengthWiseIndex = length*gridLength + breath;
      const breathWiseIndex = breath*gridLength + length;
      lengthWiseMatchCount += playerMoves[lengthWiseIndex];
      breathWiseMatchCount += playerMoves[breathWiseIndex];
      if(length + breath === gridLength -1 ){
        secondaryDiagonalWiseMatchCount += playerMoves[lengthWiseIndex];
      }
      if(length === breath){
        primaryDiagonalWiseMatchCount += playerMoves[lengthWiseIndex]
      }
    }
    if(lengthWiseMatchCount === gridLength || breathWiseMatchCount === gridLength ||
      primaryDiagonalWiseMatchCount === gridLength || secondaryDiagonalWiseMatchCount === gridLength){
      return true;
    }
    lengthWiseMatchCount = 0;
    breathWiseMatchCount = 0;
  }
  return false;
};

const isDraw = (combinedMoves, size) => {
  const sum = combinedMoves.reduce((acc, val) => acc+val ,0);
  return sum === size
};

module.exports = { isWin, isDraw };
