// bun chat server
//  for bun v0.2.1-

import serveStatic from "serve-static-bun";

const PORT = 8000;
const HOST = 'localhost';
const STATIC = 'html';

const staticHandler = serveStatic(STATIC);

async function sleep(milisec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('OK'), milisec);
  });
}

Bun.serve({
  host: HOST,
  port: PORT,

  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === '/chat') {
      console.log('/chat - UPGRADE');
      if (server.upgrade(req))
        return;
    }

    return staticHandler(req, server);
  },

  websocket: {
    open(ws) {
      console.log('--open--');
    },

    message(ws, message) {
      console.log(`received: ${message}`);
      const data = JSON.parse(message);
      if (data.type === 'enter') {
        const topic = data.text;
        console.log('subscribe:', topic);
        ws.subscribe(topic);
      }
      if (data.type === 'pub') {
        const topic = data.topic;
        const text = data.text;
        console.log('publish:', topic, text);
        ws.publish(topic, text);
      }
    },

    close(ws) {
      console.log('--close--');
    },
  },


});
