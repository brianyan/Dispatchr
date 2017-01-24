var config = require('../config');
var mongoose = require('mongoose');
mongoose.connect('config.dbURI');

Mongoose.connection.on('error', function(err) {
	if(err) throw err;
});

module.exports = { Mongoose,
  models: {
    user: require('./schemas/room.js')
  }
};
