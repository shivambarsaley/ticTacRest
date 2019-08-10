const Lab = require('lab');
const Chai = require('chai');
// const Sinon = require('sinon');

exports.lab = Lab.script();
const { lab } = exports;
const { expect } = Chai;
const { isWin, isDraw } = require('../../helpers/gameHelper');

lab.experiment('isWin success cases', () => {
  lab.test('should successfully find a row match', (done) => {
    const playerMove = [0,0,0,1,1,1,0,0,0];
    expect(isWin(playerMove, 9)).to.eq(true);
  });
  lab.test('should successfully find a col match', (done) => {
    const playerMove = [0,0,1,0,0,1,0,0,1];
    expect(isWin(playerMove, 9)).to.eq(true);
  });
  lab.test('should successfully find a diagonal match', (done) => {
    const playerMove = [1,0,0,0,1,0,0,0,1];
    expect(isWin(playerMove, 9)).to.eq(true);
  });
   lab.test('should successfully find a diagonal match', (done) => {
    const playerMove = [0,0,1,0,1,0,1,0,0];
    expect(isWin(playerMove, 9)).to.eq(true);
  });
});

lab.experiment('isWin Failure cases', () => {

  lab.test('should fail if there is no match', (done) => {
    const playerMove = [0,1,1,1,0,0,0,0,0];
     expect(isWin(playerMove, 9)).to.eq(false);
  });
});

lab.experiment('should declare it draw if all moves are done and no wins', () => {
  lab.test('should conclude draw', () => {
    expect(isDraw([1,1,1,1,1,1,1,1,1],9)).to.eq(true);
  });
  lab.test('should not conclude draw', () => {
    expect(isDraw([1,1,1,1,0,0,0,1,1],9)).to.eq(false);
  });
});
