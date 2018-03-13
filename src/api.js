import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:1337');

function subscribeToData(cb) {
  socket.on('data', (data) => cb(null, data));
  socket.emit('subscribeToData', 1000);
}

export { subscribeToData };