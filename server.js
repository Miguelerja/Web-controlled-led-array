const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 3000;

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('green led value', (data) => console.log(data));
  socket.on('blue led value', (data) => console.log(data));
  socket.on('yellow led value', (data) => console.log(data));
  socket.on('red led value', (data) => console.log(data));
  socket.on('white led value', (data) => console.log(data));
});

server.listen(PORT, () => {
  console.log('Server listening on Port 3000');
});
