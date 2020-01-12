const express = require('express');
const { Board, Led } = require('johnny-five');
const { EVENTS, PORT } = require('./vars');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const board = new Board({
  repl: false,
});

board.on('ready', () => {
  const whiteLed = new Led({
    pin: 10,
  });
  const redLed = new Led({
    pin: 6,
  });
  const yellowLed = new Led({
    pin: 5,
  });
  const blueLed = new Led({
    pin: 9,
  });
  const greenLed = new Led({
    pin: 3,
  });

  io.on('connection', (socket) => {
    console.log('socket connected');
    greenLed.on();
    blueLed.on();
    yellowLed.on();
    redLed.on();
    whiteLed.on();

    socket.on(EVENTS.GREEN_LED_BRIGHTNESS, (data) => greenLed.brightness(data));
    socket.on(EVENTS.BLUE_LED_BRIGHTNESS, (data) => blueLed.brightness(data));
    socket.on(EVENTS.YELLOW_LED_BRIGHTNESS, (data) => yellowLed.brightness(data));
    socket.on(EVENTS.RED_LED_BRIGHTNESS, (data) => redLed.brightness(data));
    socket.on(EVENTS.WHITE_LED_BRIGHTNESS, (data) => whiteLed.brightness(data));
  });

  board.on('exit', () => {
    greenLed.off();
    blueLed.off();
    yellowLed.off();
    redLed.off();
    whiteLed.off();
  });
});


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
  console.log('Server listening on Port 3000');
});
