const WSClient = require('websocket').client;

const client = new WSClient();

client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
  console.log('WebSocket Client Connected');
  
  connection.on('error', function(error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on('close', function() {
    console.log('echo-protocol Connection Closed');
  });

  connection.on('message', function(message) {
    //console.log('message:', message);
    if (message.type === 'utf8') {
       console.log("Received: '" + message.utf8Data + "'");
       if (message.utf8Data === 'Echoback:Hello') {
          console.log('got hello');
          connection.send('QUIT');
       }
    }
  });

  connection.send('Hello');
});

const PORT = 8000;
const URL = 'ws://localhost:' + PORT;
client.connect(URL, 'echo-protocol');
