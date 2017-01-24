var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  users: {id1: String, id2: String},
  user_msgs : [{is_sender: String, msg_body: String, timestamp: {type: Date, default: Date.now}}],
  received: Boolean,
})

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
