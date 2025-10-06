import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();

// socket.on → "listen for events from client"

// socket.emit → "send events to client(s)"

// Broadcast → everyone except sender

// io.emit → everyone including sender

//Http server
const server = createServer(app);

//Socket.io server
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));;
});
// Step 2 = Received message by Server  , 

io.on('connect', (socket) => {
    
  socket.on('chat message', (msg) => {
      // console.log(name);
      socket.broadcast.emit('chat message', msg);
       // io.emit('chat message', msg);
      });
      
      socket.on('new-user', (name) => {
        // console.log("new user joined", name);
        socket.broadcast.emit('new-user', name);
          // io.emit('chat message', msg);
        });
  });

  const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});