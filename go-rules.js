var Board = require('go-board.js');

var Game = function(){
  this.goBoard = new Board;
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
  play: function(x, y){
    if(!this.goBoard.isOnBoard(x, y) || !this.goBoard.isEmptyPos(x, y)){
      return false;
    }
    //insert piece
    this.goBoard.set(x, y);
    //check for atari/suicide
    if(this.checkAtari(x, y)){
      this.goBoard.set(x, y, this.goBoard.empty);
      return false;
    } else{
      //check for captures
      this.checkCapture(x, y);
    }
    this.goBoard.changeColor();
    return true;
  },

  checkAtari: function(x, y){
    var captured = { pieces: [], visited: {} };
    var liberty = 0;
    this.checkConnected(x, y, liberty, captured, this.goBoard.otherColor);
    if(liberty === 0){
      return true;
    }
    return false;
  },

  //check for captured oposing pieces, removes if valid
  checkCapture: function(x, y){
    var neighbors = [[x, y+1], [x+1, y], [x, y-1], [x-1, y]];
    for(var i = 0; i < 4; i++){
      var captured = { pieces: [], visited: {} };
      var liberty = 0;
      var next = neighbors[i];
      this.checkConnected(next[0], next[1], liberty, captured);
      if(liberty === 0){
        capture(captured.pieces);
      }
    }
  },

  //floodfill operation, modifies counter and capture
  //adds all adjacent stones of the color just played to capture
  //increments liberty counter
  checkConnected: function(x, y, liberty, captured, otherColor){
    var color = otherColor || this.goBoard.currentColor;
    var stone = this.goBoard.get(x, y);
    if(captured.visited[''+x+y] || stone === color){
      return;
    }
    if(stone === this.goBoard.empty){
      liberty++;
      return;
    }
    captured.pieces.push([x,y]);
    captured.visited[''+x+y] = true;

    //iterate over each adjacent piece
    var neighbors = [[x, y+1], [x+1, y], [x, y-1], [x-1, y]];
    for(var i = 0; i < 4; i++){
      var next = neighbors[i];
      checkConnected(next[0], next[1], liberty, captured, color);
    }
    return;
  }, 

  //removes all pieces in captured array
  capture: function(captured){
    for(var i = 0; i < captured.length; i++){
      var stone = captured[i];
      this.goBoard.set(stone[0], stone[1], this.goBoard.empty);
    }
  }

}