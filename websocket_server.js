//
// simple server with websocket
//  using https://github.com/theturtle32/WebSocket-Node
//    https://www.npmjs.com/package/websocket
//

const PORT = 8000;
const WSServer = require('websocket').server;

// ---- http ---
const http = require('http');
const server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(PORT, function() {
    console.log((new Date()) + ' Server is listening on port ' + PORT);
});

// ---- WebSocket --
const wss = new WSServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wss.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.send('connected!');

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connection.sendUTF('Echoback:' + message.utf8Data);

      if (message.utf8Data === 'QUIT') {
        console.log('QUIT Server');
        process.exit(0);
      }
  }
  });
  
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

});
