import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

const PORT = 8000;

const wss = new WebSocketServer(PORT);
wss.on("connection", function (ws: WebSocketClient) {
  ws.send('connected!');

  ws.on("message", function (message: string) {
    console.log('received: %s', message);
    ws.send('Echoback:' + message);


    const text = '' + message;
    if (text === 'QUIT') {
      console.log('QUIT Server');
      //await sleep(10); // wait for ws.send() finish

      ws.close();
      Deno.exit(0);
    }
  });
});
