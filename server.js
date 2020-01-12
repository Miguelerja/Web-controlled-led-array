const express = require('express');
const { Board, Led, Leds } = require('johnny-five');
const { EVENTS, PORT } = require('./vars');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const board = new Board({ repl: false });

board.on('ready', () => {
  const whiteLed = new Led(10);
  const redLed = new Led(6);
  const yellowLed = new Led(5);
  const blueLed = new Led(9);
  const greenLed = new Led(3);

  const lights = new Leds([greenLed, blueLed, yellowLed, redLed, whiteLed]);

  io.on('connection', (socket) => {
    console.log('socket connected');
    lights.on();

    socket.on(EVENTS.GREEN_LED_BRIGHTNESS, (data) => greenLed.brightness(data));
    socket.on(EVENTS.BLUE_LED_BRIGHTNESS, (data) => blueLed.brightness(data));
    socket.on(EVENTS.YELLOW_LED_BRIGHTNESS, (data) => yellowLed.brightness(data));
    socket.on(EVENTS.RED_LED_BRIGHTNESS, (data) => redLed.brightness(data));
    socket.on(EVENTS.WHITE_LED_BRIGHTNESS, (data) => whiteLed.brightness(data));
  });

  board.on('exit', () => lights.off());
});

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

server.listen(PORT, () => console.log('Server listening on Port 3000'));
