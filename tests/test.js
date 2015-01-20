var assert = require('assert');
var expect = require('chai').expect;
var GOBoard = require('../go-board.js');
var goBoard = null;

describe('Create a game board', function(){

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
    goBoard.set(5, 5, goBoard.black);
    expect(goBoard.get(5, 5)).to.equal(1);
  });
})