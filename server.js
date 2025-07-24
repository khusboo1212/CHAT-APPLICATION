const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Store username for this socket
  let username = '';

  socket.on('set username', (name) => {
    username = name;
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { user: username, text: msg });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});

