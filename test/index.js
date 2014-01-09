var should = require('chai').should();
var util = require('util');
var bot;

before(function (done) {
  var events;

  var Event = require('./fixtures/models').Event;
  new Event({
    adapters: {
      memory: require('sails-memory')
    }
  }, function (err, coll) {
    should.not.exist(err);
    events = coll;
    events.createEach([
      {name: 'party'},
      {name: 'opening'}
    ]).then(function () {
      bot = require('..')(events);
      done();
    });
  });
});

describe('webot-chat-wall', function() {
  it('should be a webot', function() {
    bot.should.to.be.instanceof(require('webot').Webot);
  });
});

describe('rules', function () {

  function reply(info, callback) {
    if (typeof info === 'string') {
      info = {text: info};
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

  it('should join event', function (done) {
    reply('join party', function (err, info) {
      should.not.exist(err);
      info.reply.should.equal('Welcome to "party"');
      done();
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
