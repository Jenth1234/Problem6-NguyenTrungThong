const io = require('socket.io-client');
const socket = io('http://localhost:3050');
socket.on('connect', () => {
  console.log('Connected to server');
  

  const scoreData = { newScore: Math.floor(Math.random() * 100) };
  console.log('Sending score update:', scoreData);
  socket.emit('updateScore', scoreData);
});


socket.on('scoreUpdate', (data) => {
  console.log('Received score update from server:', data);
});


socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
