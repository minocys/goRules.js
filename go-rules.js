var Board = require('./go-board.js');

var Game = function(size){
  this.goBoard = new Board(size);
  this.liberty = 0;
  this.captured = { pieces: [], visited: {} };
}

Game.prototype = {
  pass : function(){
    if(this.goBoard.last_move === 'pass') {
      this.gameOver();
    }
    this.goBoard.last_move = 'pass';
    this.goBoard.changeColor();
  },

  gameOver : function(){
    console.log('GAME OVER');
  },

  //play a move
  //returns true for legal move, false for illegal move
  play: function(x, y){
    if(!this.goBoard.isOnBoard(x, y) || !this.goBoard.isEmptyPos(x, y)){
      return false;
    }
    //insert piece
    this.goBoard.set(x, y);
    //check for atari/suicide
    if(this.checkAtari(x, y)){
      this.goBoard.set(x, y, true);
      return 'atari';
    }
    //check for captures
    this.checkCapture(x, y);
    this.goBoard.changeColor();
    return true;
  },

  checkAtari: function(x, y){
    this.captured = { pieces: [], visited: {} };
    this.liberty = 0;
    this.checkConnected(x, y, this.goBoard.otherColor());
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
      }
    }
  },

  //floodfill operation, modifies counter and capture
  //adds all adjacent stones of the color just played to capture
  //increments liberty counter
  checkConnected: function(x, y, otherColor){
    var color = (otherColor) ? otherColor : this.goBoard.currentColor;
    var stone = this.goBoard.get(x, y);
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
      if(this.goBoard.isOnBoard(next[0], next[1])){
        this.checkConnected(next[0], next[1], color);
      }
    }
    return;
  }, 

  //removes all pieces in captured array
  capture: function(captured){
    for(var i = 0; i < captured.length; i++){
      var stone = captured[i];
      this.goBoard.set(stone[0], stone[1], true);
    }
  }
}

module.exports = Game;