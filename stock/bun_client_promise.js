//
// simple client with bun WebSocket
//  

const PORT = 8000;
//const URL = 'ws://localhost:' + PORT // NG for bun WebSocket Server
//const URL = 'ws://0.0.0.0:' + PORT // OK
const URL = 'ws://127.0.0.1:' + PORT // OK
const socket = new WebSocket(URL);


async function exchangeMessage(socket) {
  return new Promise((resolve, reject) => {
    // -- Listen for messages --
    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      const text = '' + event.data;
      //console.log('text:', text);
      if (text == 'Echoback:Hello') {
        console.log('got Hello, send QUIT');
        socket.send('QUIT');
      }
    });

    // -- Connection opened --
    socket.addEventListener('open', (event) => {
      socket.send('Hello');
    });

    // Connection closed
    socket.addEventListener('close', (event) => {
      console.log('--connection closed--');
      resolve('--closed--');
    });

    // --- error ---
    socket.addEventListener('error', (event) => {
      console.error('ERROR:', event);
      reject(event);
    });
  });
}

await exchangeMessage(socket);
console.log('--finish--');