//
// simple client with bun WebSocket
//  

const PORT = 8000;
const URL = 'ws://localhost:' + PORT
const socket = new WebSocket(URL);


async function exchangeMessage(socket) {
  return new Promise((reject, resolve) => {
    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      const text = '' + event.data;
      //console.log('text:', text);
      if (text == 'Echoback:Hello') {
        console.log('got hello');
        socket.send('QUIT');
      }
    });

    // Connection opened
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