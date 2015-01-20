var assert = require('assert');
var expect = require('chai').expect;
var GOBoard = require('../go-board.js');
var Game = require('../go-rules.js')
var goBoard = null;
var goGame = null;

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
  });

  it('should have get and set functions', function(){
    expect(goBoard.get).to.be.a('function');
    expect(goBoard.set).to.be.a('function');
    goBoard.set(5, 5);
    expect(goBoard.get(5, 5)).to.equal(1);
  });

  it('should change current stone color', function(){
    goBoard.changeColor();
    expect(goBoard.currentColor).to.equal(2);
  });

  it('should return test for an empty space', function(){
    expect(goBoard.isEmptyPos(10,8)).to.equal(true);
    goBoard.set(10,8);
    expect(goBoard.isEmptyPos(10,8)).to.equal(false);
  });

})

describe('The game logic', function(){
  beforeEach(function(){
    goGame = new Game;
  });

  it('should be able to pass, play, and end the game', function(){
    expect(goGame.pass).to.be.a('function');
    expect(goGame.play).to.be.a('function');
    expect(goGame.gameOver).to.be.a('function');
  });

})