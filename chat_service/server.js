var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);

// database stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:password@ds117109.mlab.com:17109/dispatchrchat');
var Message = require('./database/schemas/message');
app.get('/', function(req, res){

  var sample = new Message({
    users: {id1:"Alok", id2:"Spencer"},
    user_msgs : {is_sender: "Alok", msg_body: "testing", timestamp: new Date()},
    received: false,
  });

  console.log("hello");

  sample.save(function(err, sample){
    if(err) {
      return console.error(err);
    } else {
      res.send(sample);
    }
    console.log("Message saved successfully");
  })
});

function socketFormat(messageMongoose){
  var message = {

  }
}
app.get('/chatroom', function(req, res) {
  // updating the chat when user sends a message
  Message.findOne({users: {id1:'Alok', id2: 'Spencer'}}, function(err, message){
    console.log(message);
    message.user_msgs.push({is_sender: "Alok", msg_body: "testing2", timestamp: new Date()});
    message.save(function(err) {
      if(err) {
        console.log(message);
      }
    });
  });

  // loading previous messages

  //
});
// app.get('/sendMessage', function())

// function _sendAndSaveMessage(message, socket, fromServer) {
//   var messageData = {
//     text: message.text,
//     user: message.user,
//     createdAt: new Date(message.createdAt),
//     chatId: chatId
//   };
//
//   db.collection('messages').insert(messageData, (err, message) => {
//     // If the message is from the server, then send to everyone.
//     var emitter = fromServer ? websocket : socket.broadcast;
//     emitter.emit('message', [message]);
//   });
// }
server.listen(3000, () => console.log('listening on *:3000'));

// websocket.on('connection', (socket) => {
//   console.log('A client has just joined', socket.id);
// });
