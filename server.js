const app = require('express')();
const server = require('http').createServer(app);
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
