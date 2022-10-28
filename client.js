//
// simple client with ws
//  

const PORT = 8000;
const URL = 'ws://localhost:' + PORT; // OK for Node.js, OK for Bun
//const URL = 'ws://127.0.0.1:' + PORT; // OK
//const URL = 'ws://[::1]:' + PORT; // NG refused
const Client = require('ws').WebSocket;

const ws = new Client(URL);

ws.on('open', function open() {
  ws.send('Hello');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
  const text = '' + data;

  if (text === 'Echoback:Hello') {
    console.log('got hello');
    ws.send('QUIT');
  }
});


