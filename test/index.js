var expect = require('expect.js'),
    webotChatWall = require('..');

describe('webot-chat-wall', function() {
  it('should say hello', function(done) {
    expect(webotChatWall()).to.equal('Hello, world');
    done();
  });
});
