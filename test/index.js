var should = require('chai').should();
var util = require('util');

var bot;

before(function () {
  var events = require('./stubs/events');
  var messages = require('./stubs/messages');
  bot = require('..')(events, undefined, messages);
});

describe('webot-chat-wall', function() {
  it('should be a webot', function() {
    bot.should.to.be.instanceof(require('webot').Webot);
  });
});
// excluded temporarily due to the change in API
describe('rules', function () {

  function reply(info, callback) {
    if (typeof info === 'string') {
      info = {text: info};
    }
    if (!info.session) {
      info.session = {};
    }
    bot.reply(info, callback);
  }

  it('should return help message', function (done) {
    reply('help', function (err, info) {
      should.not.exist(err);
      should.exist(info.reply);
      done();
    });
  });

  describe('join event', function () {
    var info = {};
    it('should join event', function (done) {
      info.text = 'join party';
      reply(info, function (err, info) {
        should.not.exist(err);
        info.reply.should.equal('Welcome to "party"');
        done();
      });
    });
    it('should acknowledge message', function (done) {
      info.text = 'hello';
      reply(info, function (err, info) {
        should.not.exist(err);
        info.reply.should.equal('[party] copy');
        done();
      });
    });
    it('should continue chat', function (done) {
      info.text = 'hello again';
      reply(info, function (err, info) {
        should.not.exist(err);
        info.reply.should.equal('[party] copy');
        done();
      });
    });
    it('should exit chat', function (done) {
      info.text = 'exit';
      reply(info, function (err, info) {
        should.not.exist(err);
        info.reply.should.equal('bye');
        done();
      });
    });
    it('should return normal', function (done) {
      info.text = 'hello';
      reply(info, function (err, info) {
        should.not.exist(err);
        info.reply.should.not.equal('[party] copy');
        done();
      });
    });
  });

  it('should prompt error', function (done) {
    reply('join not existing', function (err, info) {
      should.not.exist(err);
      info.reply.should.equal('No such event "not existing"');
      done();
    });
  });
});
