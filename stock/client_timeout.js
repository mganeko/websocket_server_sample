//
// simple client with ws
//  

const PORT = 8000;
const URL = 'ws://localhost:' + PORT
const Client = require('ws').WebSocket;

const ws = new Client(URL);

ws.on('message', function message(data) {
  console.log('received: %s', data);
  const text = '' + data;

  if (text === 'Echoback:Hello') {
    console.log('got hello');
    ws.send('QUIT');
  }
});

ws.on('open', function open() {
  ws.send('Hello');
});


setTimeout(function() {
  console.log('---timeout---');
  //setTimeout(function() {
  //  console.log('---timeout2---');
  //}, 100);
}, 100);
