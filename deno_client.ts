const HOST = 'localhost';
const PORT = 8000;
const wsURL = `ws://${HOST}:${PORT}`;

function createWebSocket() {
  const websocket = new WebSocket(wsURL);
  websocket.onopen = () => {
    websocket.send('Hello')
  }
  websocket.onmessage = (message) => {
    console.log(message.data);
    const text = '' + message.data;

    if (text === 'Echoback:Hello') {
      console.log('got hello');
      websocket.send('QUIT');
    }
  }
}

createWebSocket();
