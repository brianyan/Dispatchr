var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var mongoose = require('mongoose');

mongoose.connect('mongodb://user:password@ds117109.mlab.com:17109/dispatchrchat');
var db = mongoose.connection;
var app = express();
var server = http.Server(app);
var websocket = socketio(server);
var Message = require('./database/schemas/message');

server.listen(3000, () => console.log('listening on *:3000'));

// Mapping objects to easily map sockets and users.
var clients = {};
clients["Alok"] = 0;
clients["Brian"] = 1;
clients["Jordan"] = 2;
clients["Sal"] = 3;
clients["Spencer"] = 4;

var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
// var chatId = 1;

websocket.on('connection', (socket) => {
    clients[socket.id] = socket;
    socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('message', (message) => onMessageReceived(message, socket));
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {
  try {
    // The userId is null for new users.
    if (!userId) {
      // var user = db.collection('users').insert({}, (err, user) => {
      //   socket.emit('userJoined', user._id);
      //   users[socket.id] = user._id;
      //   _sendExistingMessages(socket);
      // });
    } else {
      users[socket.id] = userId;
      _sendExistingMessages(socket);
    }
  } catch(err) {
    console.err(err);
  }
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  var userId = users[senderSocket.id];
  // Safety check.
  if (!userId) return;

  _sendAndSaveMessage(message, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
  var messages = db.collection('messages').findOne({users: {id1:'Alok', id2: 'Spencer'}}, function(err, message){
    console.log(message);
  });
  // var messages = db.collection('messages')
  //   .findOne({ chatId })
  //   .sort({ createdAt: 1 })
  //   .toArray((err, messages) => {
  //     // If there aren't any messages, then return.
  //     if (!messages.length) return;
  //     socket.emit('message', messages.reverse());
  // });
}
function transform_message_to_DataBaseMessage(message){
  var message = new Message({
    users: {id1: message.sender, id2: message.receiver},
    user_msgs: {is_sender: message.sender, msg_body: message.msg_body, timestamp: message.timestamp},
    received: false,
  })
  return message;
}
// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {
  var messageData = transform_message_to_DataBaseMessage(message);

  db.collection('messages').insert(messageData, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? websocket : socket.broadcast;
    emitter.emit('message', [message]);
  });
}

// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    receiver: clients["Alok"].toString(),
    sender: clients["Spencer"].toString(),
    msg_body: d.toString().trim(),
    timestamp: new Date(),
    /*user: { _id: 'robot' } */
  }, null /* no socket */, true /* send from server */);
});
