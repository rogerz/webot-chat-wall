var Webot = require('webot').Webot;
var util = require('util');
var chatBot = require('webot-chat');

// The models are passed via function, since it may not be available when the bot is created

module.exports = function createBot(getModels) {
  var webot = new Webot();

  // help rule
  webot.set('help', {
    pattern: /help/i,
    handler: 'type event name to join'
  });

  // list rule
  webot.set('join', {
    pattern: /^join\s*(.*)/i,
    handler: function joinHandler(info, next) {
      var models = getModels();
      var events = models.event;
      var guests = models.guest;
      var messages = models.message;

      var name = info.param[1];
      events.findOne({name: name}, function (err, event) {
        if (event) {
          webot.waitBot('chat', chatBot(event, messages));
          info.delegate('chat');
          next(null, util.format('Welcome to "%s"', event.name));
        } else {
          next(null, util.format('No such event "%s"', name));
        }
      });
    }
  });

  return webot;
};
