var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket - socketio(server);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => console.log('listening on *:3000'));

websocket.on('connection', (socket) => {
  console.log('A client has just joined', socket.id);
});
