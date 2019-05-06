// import socketIo = require('socket.io');
// import * as http from 'http';
// import App from '../App';
import User from '../models/user.model';

// const server = http.createServer(App);
// server.listen(3001, "0.0.0.0");
// export const io: socketIo.Server = socketIo(server);

export function socket(io) {
  io.on('connected', socket => {
    console.log('connected');
    socket.on('subscribe', function(room) { 
      console.log('joining room', room);
      socket.join(room);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
}