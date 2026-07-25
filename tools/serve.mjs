/* fb40 · /tools/serve.mjs · v0.1.0 · 2026-07-25 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.webmanifest':'application/manifest+json', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.md':'text/markdown; charset=utf-8' };

export function createServer() {
  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      const requested = decodeURIComponent(url.pathname).replace(/^\/+/, '');
      let filePath = normalize(join(root, requested || 'index.html'));
      if (!filePath.startsWith(normalize(root))) throw new Error('Invalid path.');
      try { if ((await stat(filePath)).isDirectory()) filePath = join(filePath, 'index.html'); }
      catch { filePath = join(root, 'index.html'); }
      const body = await readFile(filePath);
      response.writeHead(200, { 'content-type': types[extname(filePath)] || 'application/octet-stream', 'cache-control': 'no-store' });
      response.end(body);
    } catch (error) {
      response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      response.end(error.message);
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createServer().listen(port, '127.0.0.1', () => console.log(`Full by 40 Phase 0: http://127.0.0.1:${port}`));
}
