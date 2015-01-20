//pieces
var empty = 0;
var black = 1;
var white = 2;


//Board constructor
var GOboard = function(size){
  this.size = size || 19;
  this.board = this.createBoard(this.size);
  this.current_move = black;
  this.last_move = null;
}

//Create array representation of board
GOboard.prototype.createBoard = function(size){
  var board = []
  for( var i = 0; i < size*size; i++ ){
    board[i] = empty;
  }
  return board;
}

//Checks if position is on the board
GOboard.prototype.isOnBoard = function(x, y){
  if( x < 0 || x >= this.size || y < 0 || y >= this.size){
    return false;
  }
  return true;
}

//Get piece at position
GOboard.prototype.get = function(x, y){
  if(this.isOnBoard(x, y)){
    return this.board[(x * this.size) + y];
  }
  return null;
}

//Set piece at position
GOboard.prototype.set = function(x, y, piece){
  this.board[(x * this.size) + y] = piece;
}

module.exports = new GOboard();