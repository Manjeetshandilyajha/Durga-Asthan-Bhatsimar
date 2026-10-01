import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import panditRoutes from './routes/panditRoutes.js';
import committeeRoutes from './routes/committeeRoutes.js';

import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Helmet with relaxed cross-origin resource policy for uploads
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS Allowed Origins List
const allowedOrigins = [
  'https://durga-asthan-bhatsimar-client.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

if (process.env.CLIENT_URL) {
  const envOrigins = process.env.CLIENT_URL.split(',').map((url) => url.trim().replace(/\/$/, ''));
  envOrigins.forEach((url) => {
    if (url && !allowedOrigins.includes(url)) {
      allowedOrigins.push(url);
    }
  });
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(cleanOrigin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    if (cleanOrigin.endsWith('.onrender.com') || cleanOrigin.includes('localhost')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per window
  message: { message: 'अतिवृद्धि अनुरोध, कृपया किछ समय बाद पुनः प्रयास करू।' },
});
app.use('/api', limiter);

// Serve Static Uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'दुर्गा स्थान, भटसिमर - API',
    timestamp: new Date().toISOString(),
  });
});

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/history-submissions', submissionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/pandits', panditRoutes);
app.use('/api/committee', committeeRoutes);

// Error Handler Middleware
app.use(errorHandler);

export default app;
