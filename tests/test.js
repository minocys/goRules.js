var assert = require('assert');
var expect = require('chai').expect;
//gameboard
var GOBoard = require('../go-board.js');
var Game = require('../go-rules.js')
var goBoard = null;
var goGame = null;
//pieces
var empty = 0;
var black = 1;
var white = 2;

describe('The game board', function(){

  beforeEach(function(){
    goBoard = new GOBoard;
  });

  it('should have a createBoard function', function(){
    expect(goBoard.createBoard).to.be.a('function');
  });

  it('it should create a single array to represent the board', function(){
    expect(goBoard.board).to.be.a('array');
  });

  it('should be the correct length', function(){
    expect(goBoard.board.length).to.equal(19 * 19);
    goBoard = new GOBoard(5)
    expect(goBoard.board.length).to.equal(5 * 5);
  });

  it('should have get and set functions', function(){
    expect(goBoard.get).to.be.a('function');
    expect(goBoard.set).to.be.a('function');
    goBoard.set(5, 5);
    expect(goBoard.get(5, 5)).to.equal(black);
  });

  it('should change current stone color', function(){
    goBoard.changeColor();
    expect(goBoard.currentColor).to.equal(white);
  });

  it('should return true for an empty space', function(){
    expect(goBoard.isEmptyPos(10,8)).to.equal(true);
    goBoard.set(10,8);
    expect(goBoard.isEmptyPos(10,8)).to.equal(false);
  });

})

describe('The game logic: ', function(){
  beforeEach(function(){
    goGame = new Game(5);
  });

  it('should be able to pass, play, and end the game', function(){
    goGame.pass();
    expect(goGame.last_move[0]).to.equal('pass');
    expect(goGame.gameOver).to.be.a('function');
    expect(goGame.play).to.be.a('function');
  });

  describe('when playing a piece:', function(){
    beforeEach(function(){
      goGame = new Game(5);
    });

    it('it should play a piece', function(){
      expect(goGame.goBoard.get(2,2)).to.equal(empty);
      goGame.play(2, 2);
      expect(goGame.goBoard.currentColor).to.equal(white);
    });

    it('should not allow atari/suicide',function(){
      var x = 2;
      var y = 2;
      var neighbors = [[x, y+1], [x+1, y], [x, y-1], [x-1, y]];
      for(var i = 0; i < 4; i++){
        goGame.goBoard.set(neighbors[i][0], neighbors[i][1]);
      }
      goGame.goBoard.changeColor();
      goGame.play(2,2);
      expect(goGame.goBoard.get(2,2)).to.equal(0);
    });

    it('should capture pieces and remove them from board', function(){
      var x = 2;
      var y = 2;
      var neighbors = [[x, y+1], [x+1, y], [x, y-1], [x-1, y]];
      goGame.play(2,2);
      expect(goGame.goBoard.get(2,2)).to.equal(black);
      for(var i = 0; i < 3; i++){
        goGame.goBoard.set(neighbors[i][0], neighbors[i][1]);
      }
      // console.log(goGame.goBoard.get(x+1, y));
      console.log(goGame.play(neighbors[3][0], neighbors[3][1]));
      expect(goGame.goBoard.get(2,2)).to.equal(empty);
    });


  });

})