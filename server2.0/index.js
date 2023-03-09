const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('data_to_calculate', msg => {
    console.log(`data to cal is ${msg}`);
    result = eval(msg);
    console.log(`result is ${result}`);
    io.emit('calculated_result', result);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
