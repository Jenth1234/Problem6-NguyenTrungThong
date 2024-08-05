const socketIo = require('socket.io');

const socketConfig = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

  
    socket.on('updateScore', (data) => {
      console.log('Score updated:', data);

      // Phát sự kiện cho tất cả client
      io.emit('scoreUpdate', data);
    });


    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = socketConfig;
