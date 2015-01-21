var Board = require('./SquareBoard.js');

//setup pieces variables
var pieces = {
  empty : 0,
  black : 1,
  white : 2
}

//GO constructor, standard board size is 19
var GO = function(size){
  this.board = new Board(size, pieces);
  this.move_history = [];

  //storage variables for check functions
  //they reset before every set of checks
  this.currentColor = pieces.black;
  this.liberty = 0;
  this.captured = { pieces: [], visited: {} };
}

Game.prototype = {
  
  //Get opposite color
  otherColor: function(){
    return (this.currentColor === pieces.black) ? pieces.white : pieces.black;
  },

  //for switching current piece color after play
  changeColor: function(){
    this.currentColor = this.otherColor();
  },

  //pass move, ends game if both player pass consecutively
  pass : function(){
    if(this.move_history[this.move_history.length-1] === 'pass') {
      this.gameOver();
    }
    this.move_history.push('pass');
    this.changeColor();
  },

  //TODO - event when game over
  gameOver : function(){
    console.log('GAME OVER');
  },

  //play a move
  //returns true for legal move, false for illegal move
  play: function(x, y){
    if(!this.board.isOnBoard(x, y) || !this.board.isEmptyPos(x, y)){
      return false;
    }
    //insert piece
    this.board.set(x, y);
    //check for atari/suicide
    if(this.checkAtari(x, y)){
      this.board.set(x, y, 'empty');
      return 'atari';
    }
    //check for captures
    this.checkCapture(x, y);
    this.changeColor();
    return true;
  },

  //check for atari/suicide, returns true if move was atari
  checkAtari: function(x, y){
    this.captured = { pieces: [], visited: {} };
    this.liberty = 0;
    this.checkConnected(x, y, this.board.otherColor());
    if(this.liberty === 0){
      return true;
    }
    return false;
  },

  //check for captured oposing pieces, removes if valid
  checkCapture: function(x, y){
    var neighbors = [[x, y+1], [x+1, y], [x, y-1], [x-1, y]];
    for(var i = 0; i < 4; i++){
      this.captured = { pieces: [], visited: {} };
      this.liberty = 0;
      var next = neighbors[i];
      this.checkConnected(next[0], next[1]);
      if(this.liberty === 0){
        this.capture(this.captured.pieces);
        this.move_history.push([x, y, this.captured.pieces]);
      } else{
        this.move_history.push([x, y, []]);
      }
    }
  },

  //floodfill operation, modifies counter and capture
  //adds all adjacent stones of the color just played to capture
  //increments liberty counter
  checkConnected: function(x, y, otherColor){
    var color = (otherColor) ? otherColor : this.board.currentColor;
    var stone = this.board.get(x, y);
    if(this.captured.visited[''+x+','+y] || stone === color){
      return;
    }
    if(stone === 0){
      this.liberty++;
      return;
    }
    this.captured.pieces.push([x,y]);
    this.captured.visited[''+x+','+y] = true;
    //iterate over each adjacent piece
    var neighbors = [[x, y+1], [x+1, y], [x, y-1], [x-1, y]];
    for(var i = 0; i < 4; i++){
      var next = neighbors[i];
      if(this.board.isOnBoard(next[0], next[1])){
        this.checkConnected(next[0], next[1], color);
      }
    }
    return;
  }, 

  //removes all pieces in captured array
  capture: function(captured){
    for(var i = 0; i < captured.length; i++){
      var stone = captured[i];
      this.board.set(stone[0], stone[1], 'empty');
    }
  }
}

module.exports = GO;