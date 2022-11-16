function createWebSocket() {
  const websocket = new WebSocket("ws://localhost:8000")
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
