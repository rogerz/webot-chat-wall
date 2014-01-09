var Waterline = require('waterline');

exports.Event = Waterline.Collection.extend({
  tableName: 'event',
  adapter: 'memory',
  attributes: {
    name: {
      type: 'string'
    }
  }
});
