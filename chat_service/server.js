var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);

// database stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:password@ds117109.mlab.com:17109/dispatchrchat');

app.get('/', function(req, res){
  // res.send('ok');
  var Message = require('./database/schemas/message');
  var sample = new Message({
    messageBody : "Hello there",
    received: false,
    sender: "Brian",
    receiver: "Melinda",
    date : new Date(),
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

// app.get('/messages', func)
//
// app.get('/', function(req, res){
//   var Message = require('./database/schemas/message');
//   var sample = new Message({
//     messageBody : "Hello there",
//     received: false,
//     sender: "Brian",
//     receiver: "Melinda",
//     date : Date.now,
//   });
//
//   console.log("hello");
//
//
//   sample.save(function(err, sample){
//     if(err) {
//       return console.error(err);
//     } else {
//       res.send(sample);
//     }
//     console.log("Message saved successfully");
//   })
// });
//
server.listen(3000, () => console.log('listening on *:3000'));

// websocket.on('connection', (socket) => {
//   console.log('A client has just joined', socket.id);
// });
