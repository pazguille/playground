var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('cliente', function (data) {
    io.sockets.emit('servidor', data); // a todos los que estan conectados!
  });
});