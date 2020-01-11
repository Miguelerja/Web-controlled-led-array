const { Board, Led } = require('johnny-five');

const board = new Board;

board.on('ready', () => {
  const whiteLed = new Led({
    pin: 7,
  });
  const redLed = new Led({
    pin: 6,
  });
  const yellowLed = new Led({
    pin: 5,
  });
  const blueLed = new Led({
    pin: 4,
  });
  const greenLed = new Led({
    pin: 3,
  });
});
