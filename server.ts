import express from 'express';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Gzip & Deflate compression for all responses
  app.use(compression({
    level: 6,
    threshold: 1024, // only compress responses > 1KB
  }));

  // Middleware for large media uploads (photos & videos up to 150MB)
  app.use(express.json({ limit: '150mb' }));
  app.use(express.urlencoded({ limit: '150mb', extended: true }));

  // Define asset storage directories in project
  const srcUploadsDir = path.join(process.cwd(), 'src', 'assets', 'uploads');
  const publicUploadsDir = path.join(process.cwd(), 'public', 'assets', 'uploads');
  const srcVideosDir = path.join(process.cwd(), 'src', 'assets', 'videos');
  const publicVideosDir = path.join(process.cwd(), 'public', 'assets', 'videos');
  const publicImagesDir = path.join(process.cwd(), 'public', 'assets', 'images');

  // Ensure upload directories exist
  try {
    if (!fs.existsSync(srcUploadsDir)) fs.mkdirSync(srcUploadsDir, { recursive: true });
    if (!fs.existsSync(publicUploadsDir)) fs.mkdirSync(publicUploadsDir, { recursive: true });
    if (!fs.existsSync(srcVideosDir)) fs.mkdirSync(srcVideosDir, { recursive: true });
    if (!fs.existsSync(publicVideosDir)) fs.mkdirSync(publicVideosDir, { recursive: true });
  } catch (err) {
    console.warn('Could not initialize upload directories:', err);
  }

  // Cache options for high-performance static asset delivery
  const staticCacheOptions = {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    immutable: true,
    setHeaders: (res: express.Response, filepath: string) => {
      if (/\.(jpg|jpeg|png|webp|avif|mp4|webm|svg|woff2|woff)$/i.test(filepath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  };

  // Statically serve uploads and media with aggressive caching
  app.use('/assets/uploads', express.static(publicUploadsDir, staticCacheOptions));
  app.use('/assets/uploads', express.static(srcUploadsDir, staticCacheOptions));
  app.use('/assets/images', express.static(publicImagesDir, staticCacheOptions));
  app.use('/assets/videos', express.static(publicVideosDir, staticCacheOptions));
  app.use('/assets/videos', express.static(srcVideosDir, staticCacheOptions));

  // Health check API
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Upload API: Saves photos and videos directly into the project's src/assets/uploads folder
  app.post('/api/upload', async (req, res) => {
    try {
      const { data, filename, category = 'media' } = req.body;

      if (!data || !filename) {
        return res.status(400).json({ error: 'Missing data or filename' });
      }

      // Determine extension
      const isVideo = data.startsWith('data:video') || filename.match(/\.(mp4|webm|mov|mkv)$/i);
      const ext = path.extname(filename) || (isVideo ? '.mp4' : '.jpg');
      const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      const safeFilename = `${category}_${Date.now()}_${baseName}${ext}`;

      // Extract base64 payload
      let buffer: Buffer;
      if (data.includes(';base64,')) {
        const base64Data = data.split(';base64,').pop() || '';
        buffer = Buffer.from(base64Data, 'base64');
      } else {
        buffer = Buffer.from(data, 'base64');
      }

      // Write to both src/assets/uploads and public/assets/uploads
      const srcPath = path.join(srcUploadsDir, safeFilename);
      const publicPath = path.join(publicUploadsDir, safeFilename);

      await fs.promises.writeFile(srcPath, buffer);
      await fs.promises.writeFile(publicPath, buffer);

      const staticUrl = `/assets/uploads/${safeFilename}`;

      console.log(`[Upload API] Saved ${safeFilename} (${buffer.length} bytes) to project assets`);

      return res.json({
        success: true,
        filename: safeFilename,
        url: staticUrl,
        srcPath: `src/assets/uploads/${safeFilename}`,
        size: buffer.length,
      });
    } catch (err: any) {
      console.error('[Upload API Error]:', err);
      return res.status(500).json({ error: err.message || 'Failed to save media in assets folder' });
    }
  });

  // List existing assets in project folder
  app.get('/api/uploads', (_req, res) => {
    try {
      const files = fs.existsSync(srcUploadsDir) ? fs.readdirSync(srcUploadsDir) : [];
      const list = files.map((f) => ({
        filename: f,
        url: `/assets/uploads/${f}`,
        path: `src/assets/uploads/${f}`,
      }));
      res.json({ files: list });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, staticCacheOptions));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wedding Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
