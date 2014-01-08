var Waterline = require('waterline');

exports.Event = Waterline.Collection.extend({
  tableName: 'event',
  adapter: 'disk',
  attributes: {
    name: {
      type: 'string'
    }
  }
});
