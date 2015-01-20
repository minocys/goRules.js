//pieces
var empty = 0;
var black = 1;
var white = 2;

//Board constructor
var GOboard = function(size){
  this.size = size || 19;
  this.board = this.createBoard(this.size);
  this.currentColor = black;
  this.last_move = null;
}

GOboard.prototype = {
  //Create array representation of board
  createBoard: function(size){
    var board = []
    for( var i = 0; i < size*size; i++ ){
      board[i] = empty;
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
  set: function(x, y, no_color){
    new_piece = (no_color) ? empty : this.currentColor;
    this.board[(x * this.size) + y] = new_piece;
  },

  //Get opposite color
  otherColor: function(){
    return (this.currentColor === black) ? white : black;
  },

  //for switching current piece color after play
  changeColor: function(){
    this.currentColor = this.otherColor();
  }
}


module.exports = GOboard;