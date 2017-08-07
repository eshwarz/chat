var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/public'));

server.listen(3000, function () {
  console.log('listening...');

});

io.on('connection', function (socket) {
  console.log('a user connected!');
  // user disconnected
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  // post message handler
  socket.on('post_message', function (response) {
    io.emit('post_message', response.message);
  });
});
