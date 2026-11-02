import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function cmsBackendPlugin(): Plugin {
  const dataDir = path.resolve(__dirname, 'data');
  const cmsFilePath = path.join(dataDir, 'cms-data.json');

  return {
    name: 'cms-backend-plugin',
    configureServer(server) {
      server.middlewares.use('/api/cms', (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'GET') {
          try {
            if (fs.existsSync(cmsFilePath)) {
              const raw = fs.readFileSync(cmsFilePath, 'utf-8');
              res.statusCode = 200;
              res.end(raw);
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ initialized: false }));
            }
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }
              fs.writeFileSync(cmsFilePath, JSON.stringify(parsed, null, 2), 'utf-8');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  ok: true,
                  savedAt: new Date().toISOString(),
                  file: 'data/cms-data.json',
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        if (req.method === 'DELETE') {
          try {
            if (fs.existsSync(cmsFilePath)) {
              fs.unlinkSync(cmsFilePath);
            }
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, reset: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cmsBackendPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              ignored: ['**/data/**'],
            },
    },
  };
});
