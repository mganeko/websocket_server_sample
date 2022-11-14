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
    if (req.url === '/chat') {
      if (server.upgrade(req))
        return;
    }

    return staticHandler(req, server);
  },

  websocket: {
    open(ws) {
      console.log('--open--');
    },
  },


});
