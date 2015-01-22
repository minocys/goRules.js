var Board = require('./SquareBoard.js');

var pieces = {
  wpawn: 'wp', bpawn,: 'bp',
  wrook: 'wr', brook, :'br',
  wknight: 'wk', bknight: 'bk',
  wbishop: 'wb', bbishop : 'bb',
  wqueen: 'wq', bqueen : 'bq',
  wking: 'WK', bking, 'BK'
}

var Chess = function(){
  this.board = new Board(8, pieces);
  for()
  this.currentTurn = 'w';
}

Chess.prototype = {

}