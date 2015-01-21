//Board constructor
var SquareBoard = function(size, pieces, enableHistory){
  this.pieces = pieces;
  this.size = size;
  this.board = this.createBoard(this.size);
  this.currentColor = black;
  this.enableHistory = enableHistory;
  if(this.enableHistory){
    //history is a stack
    this.history = [];
  }
}

SquareBoard.prototype = {
  //Create array representation of board
  createBoard: function(size){
    var board = []
    for( var i = 0; i < size*size; i++ ){
      board[i] = this.pieces.empty;
    }
    return board;
  },

  //Checks if position is on the board
  isOnBoard: function(x, y){
    if( x < 0 || x >= this.size || y < 0 || y >= this.size){
      return false;
    }
    return true;
  },

  //checks if spot is empty
  isEmptyPos: function(x, y){
    return this.get(x, y) === empty;
  },

  //Get piece at position
  get: function(x, y){
    if(this.isOnBoard(x, y)){
      return this.board[(x * this.size) + y];
    }
  },

  //Set piece at position
  //assumes 0 if piece is null
  set: function(x, y, piece){
    new_piece = this.pieces[piece] || 0;
    this.board[(x * this.size) + y] = new_piece;
    record(x, y, piece);
  },

  //Adds last move to history if history enabled.
  record: function(x, y, piece){
    if(enableHistory){
      this.history.shift({x:x, y:y, piece:piece, board:this.board});
    }
  },

  //browse through history by index, 0 is latest move
  getHistory: function(index){
    return this.history[index];
  }


}

module.exports = SquareBoard;