var socket = io();

socket.emit('post_message', { message: 'new message from client' });

socket.on('post_message', function (response) {
  $('body').append('<p>' + response + '</p>');
});
