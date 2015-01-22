var Board = require('./SquareBoard.js');

var pieces = {
  empty: 0,
  red: 1,
  black: 2
}

var Chess = function(){
  this.board = new Board(8, pieces, false, Chess.placePieces);
  this.currentTurn = 'w';
}

Chess.prototype = {
  placePieces : function(board){
    for(var i = 0; i < 23; i + 2){
      board[i] = pieces.red;
      board[board.length-i-1] = pieces.black;
    }
  }
}