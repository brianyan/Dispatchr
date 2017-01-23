var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  messageBody : String,
  received: Boolean,
  sender: String,
  receiver: String,
  date : {type: Date, default: Date.now},
})

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
