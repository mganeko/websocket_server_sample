const PORT = 3000;
const net = require('net');

const client = net.connect(PORT, 'localhost', () => {
  console.log('connected to server');
  client.write('Hello World!');
});

client.on('data', data => {
  console.log('client-> ' + data);
  client.destroy();
});

client.on('close', () => {
  console.log('client-> connection is closed');
});
