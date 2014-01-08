var Webot = require('webot').Webot;

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
    handler: function (info) {
      return info.param[1];
    }
  });

  return webot;
};
