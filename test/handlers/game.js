const Lab = require('lab');
const Chai = require('chai');
const Sinon = require('sinon');
const dbHelper = require('../../helpers/dbHelpers');
const gameHandler = require('../../handlers/game');
const gameHelper = require('../../helpers/gameHelper');

exports.lab = Lab.script();
const {lab} = exports;
const {expect} = Chai;


lab.experiment('startGame', () => {
  lab.before(() => {
    Sinon.stub(dbHelper, 'findAvailableGame').returns(null);
    Sinon.stub(dbHelper, 'joinGame').resolves('join game called');
    Sinon.stub(dbHelper, 'beginGame').resolves({});
    Sinon.stub(dbHelper, 'createGame').resolves({id: 10});
  });
  lab.after((done) => {
    dbHelper.findAvailableGame.restore();
    dbHelper.joinGame.restore();
    dbHelper.beginGame.restore();
    dbHelper.createGame.restore();
  });
  lab.afterEach(() => {
    dbHelper.joinGame.resetHistory();
    dbHelper.createGame.resetHistory();
  });
  lab.test('should start a new game if no game exists', async (done) => {
    const result = await gameHandler.startGame(1, 3);
    expect(dbHelper.createGame.callCount).to.eq(1);
    expect(result).to.eqls('join game called');
    expect(dbHelper.createGame.getCall(0).args).to.eqls([9]);
    expect(dbHelper.joinGame.getCall(0).args).to.eqls([10, 1, [0, 0, 0, 0, 0, 0, 0, 0, 0]])
  });
  lab.test('should use existing game if game exists', async (done) => {
    dbHelper.findAvailableGame.restore();
    Sinon.stub(dbHelper, 'findAvailableGame').returns({id: 20});
    const result = await gameHandler.startGame(1, 3);
    expect(dbHelper.createGame.callCount).to.eq(0);
    expect(dbHelper.joinGame.callCount).to.eq(1);
    expect(dbHelper.joinGame.getCall(0).args).to.eqls([20, 1, [0, 0, 0, 0, 0, 0, 0, 0, 0]])
  })
});

lab.experiment('playMove', () => {
  lab.before((done) => {
    Sinon.stub(dbHelper, 'getMovesForGame').returns([
      {
        user_id: 1,
        moveset: [1, 0, 0, 1, 0, 0, 0, 0, 0]
      },
      {
        user_id: 2,
        moveset: [0, 1, 0, 0, 1, 0, 0, 0, 0]
      }
    ]);
    Sinon.stub(dbHelper, 'updateMoveset').returns(true);
  });
  lab.after(() => {
    dbHelper.getMovesForGame.restore();
  });
  lab.test('should block duplicate move', async (done) => {
    const result = await gameHandler.playMove(1, 1, 0);
    expect(result).to.eqls({message: 'BAD MOVE'})
  });
  lab.test('should allow legal moves', async () => {
    const result = await gameHandler.playMove(1, 1, 2);
    expect(dbHelper.updateMoveset.callCount).to.eq(1);
    expect(dbHelper.updateMoveset.getCall(0).args).to.eqls([
      1, 1, [1, 0, 1, 1, 0, 0, 0, 0, 0]
    ]);
  });
  lab.test('should conclude if its a win', async (done) => {
    Sinon.stub(gameHelper, 'isWin').returns(true);
    Sinon.stub(dbHelper, 'endGame').returns(true);
    Sinon.stub(dbHelper, 'updatePlayerStatusInGame').returns(true);
    const result = await gameHandler.playMove(1,1,6);
    expect(dbHelper.endGame.callCount).to.eq(1);
    expect(result).to.eqls({message: 'GAME Concluded, Player 1 won'})
  })
});
