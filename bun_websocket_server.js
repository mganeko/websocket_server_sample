// bun websocket server
//  for bun v0.2.1-

const PORT=8000;

Bun.serve({
  port: PORT,

  websocket: {
    message(ws, message) {
      console.log('received: %s', message);

      ws.send('Echoback:' + message);

      const text = '' + message;
      if (text === 'QUIT') {
        console.log('QUIT Server');
        process.exit(0);
      }
    },

     open(ws) {
       ws.send('connected!');
     },
  },

  fetch(req, server) {
    // Upgrade to a ServerWebSocket if we can
    // This automatically checks for the `Sec-WebSocket-Key` header
    // meaning you don't have to check headers, you can just call `upgrade()`
    if (server.upgrade(req))
      // When upgrading, we return undefined since we don't want to send a Response
      return;

    return new Response("Regular HTTP response");
  },
});

console.log('Server start on port:' + PORT);
