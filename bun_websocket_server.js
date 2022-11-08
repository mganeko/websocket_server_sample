// bun websocket server
//  for bun v0.2.1-

const PORT=8000;
const HOST='localhost';

async function sleep(milisec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('OK'), milisec);
  });
}

Bun.serve({
  host: HOST,
  port: PORT,
  websocket: {
    open(ws) {
      console.log('--open--');
      console.log('ws:', toString.call(ws));

      // --- FAIL:  cause disconnect after 1st message event --
       ws.send('connected!'); // ... NG

      /* --- OK: await --
      await sleep(0); // 100:OK, 0:NG
      ws.send('connected!');
      console.log('-sent connected-');
      ---*/

      /*-- OK: need timeout for Bun ws client
      setTimeout(() => {
          //ws.publishText("room", `connected!`);
          ws.send('connected!');
          console.log('-sent connected-');
      }, 1); // 100...OK, 10...OK, 0...NG (close)
      -- */

      /* --- FAIL:  cause disconnect ---
      setImmediate(() => {
        ws.send('connected!');
      });
      // NG : close after receive Hello (same as setTimeout 0);
      ---*/

      /* --- FAIL ---
      process.nextTick(() => {
        ws.send('connected!')i;
        // NG : close after receive Hello (same as setTimeout 0);
      });
      ---*/
    },

    async message(ws, message) {
      console.log('received: %s', message);
      ws.send('Echoback:' + message);

      const text = '' + message;
      if (text === 'QUIT') {
        console.log('QUIT Server');
        await sleep(10); // wait for ws.send() finish
        process.exit(0);
        //ws.close(); <-- bun ERROR
      }
    },

    close(ws) {
      console.log('--close--');
    },

    perMessageDeflate: false,
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
