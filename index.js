var Webot = require('webot').Webot;

module.exports = function createBot(events, guests, messages) {
  var webot = new Webot();

  // help rule
  webot.set('help', 'type event name to join');

  return webot;
};
