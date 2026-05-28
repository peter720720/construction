const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/db');
const { limiter } = require('./src/middleware/rateLimiter');

// Import Route Handlers
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Global Middlewares
app.use(helmet());

// Dynamic CORS Engine Configurations
const frontendUrls = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(s => s.trim()).filter(Boolean) : [];
const allowedOrigins = [
  ...frontendUrls, // List of deployed frontend URLs (can be comma-separated in env)
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server or tools like Postman (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Blocked by security rules (CORS)'), false);
    }
  },
  credentials: true
};

// Allow an environment toggle to relax CORS during troubleshooting
if (process.env.ALLOW_ALL_ORIGINS === 'true') {
  app.use(cors({ origin: true, credentials: true }));
} else {
  app.use(cors(corsOptions));
}

app.use(express.json());
app.use('/api', limiter); // Security: Protects endpoints against brute-force attacks

// Mount Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Base Test Route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Premium Construction API Portal Active" });
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Premium JavaScript Backend running on port ${PORT}`);
});
