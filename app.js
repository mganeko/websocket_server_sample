// bun web server with static files

import serveStatic from "serve-static-bun";

const PORT=8001;
const STATIC='html';
Bun.serve({
    port: PORT,
    fetch: serveStatic(STATIC)
})
