//
// simple client with bun WebSocket
//  

const PORT = 8000;
const URL = 'ws://localhost:' + PORT
const socket = new WebSocket(URL);


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

setTimeout(function() {
  console.log('---timeout---');
}, 100);
