var assert = require('assert');
var expect = require('chai').expect;
var goBoard = require('../go-board.js');

describe('Create a game board', function(){

  it('should have a createBoard function', function(){
    expect(goBoard.createBoard).to.be.a('function');
  });

  it('it should create a single array to represent the board', function(){
    expect(goBoard.board).to.be.a('array');
  });

  it('should be the correct length', function(){
    expect(goBoard.board.length).to.equal(19 * 19);
  });
})