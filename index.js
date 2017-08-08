var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var sessionListener = require('./public/scripts/server/session_listener');
var postsListener = require('./public/scripts/server/posts_listener');


app.use(express.static(__dirname + '/public'));

server.listen(3000, function () {
  console.log('listening...');

});

io.on('connection', function (socket) {

  console.log('a user connected!');
  // listeners
  sessionListener.init(socket, io);
  postsListener.init(socket, io);

});
