import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.1.33:1337');

function subscribe(key, callback) {
  socket.on(key, (data) => callback(null, data));
  socket.emit(key, 1000);
}

export { subscribe };