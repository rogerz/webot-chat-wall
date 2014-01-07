var webotChatWall = require('..');

require('chai').should();

describe('webot-chat-wall', function() {
  it('should be a webot', function() {
    webotChatWall().should.to.be.instanceof(require('webot').Webot);
  });
});
