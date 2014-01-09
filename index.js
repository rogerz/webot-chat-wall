var Webot = require('webot').Webot;
var util = require('util');

module.exports = function createBot(events, guests, messages) {
  var webot = new Webot();

  // help rule
  webot.set('help', {
    pattern: /help/i,
    handler: 'type event name to join'
  });

  // list rule
  webot.set('join', {
    pattern: /^join\s*(.*)/i,
    handler: function (info, next) {
      var name = info.param[1];
      events.findOne({name: name}, function (err, event) {
        if (event) {
          next(null, util.format('Welcome to "%s"', event.name));
        } else {
          next(null, util.format('No such event "%s"', name));
        }
      });
    }
  });

  return webot;
};
