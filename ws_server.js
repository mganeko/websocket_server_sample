//
// simple server with ws
//  using https://github.com/websockets/ws
//

const PORT = 8000;
const server = require('ws').Server;
const wss = new server({port:PORT});

wss.on('connection', function connection(ws) {
  //console.log('connected:', ws);
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send('Echoback:' + data);
    const text = '' + data;

    if (text === 'QUIT') {
      console.log('QUIT Server');
      process.exit(0);
    }
  });

  ws.send('connected!');
});

console.log('WS server listening port:' + PORT);