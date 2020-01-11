const socket = io(window.location.hostname + ':' + 3000);

console.log('socket');
socket.on('connection', () => {
  socket.emit('join', 'Client is connected!');
});

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
