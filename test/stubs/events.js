module.exports = {
  findOne: function (query, callback) {
    if (query.name === 'party') {
      callback(null, {name: 'party'});
    } else {
      callback(null);
    }
  }
};
