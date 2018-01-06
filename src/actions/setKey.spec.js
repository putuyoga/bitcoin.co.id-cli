const expect = require('chai').expect;
const setKey = require('./setKey');

describe ('setKey module', () => {
  it ('should export a function', () => {
    expect(setKey).to.be.a('function');
  })
})
