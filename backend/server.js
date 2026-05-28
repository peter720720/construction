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
const allowedOrigins = [
  process.env.FRONTEND_URL, // Deployed domain (e.g., https://vercel.app)
  'http://localhost:5173'   // Local client dev port
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow serverless utilities, api requests with no origin headers (e.g., Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Blocked by security rules (CORS)'), false);
    }
  },
  credentials: true
}));

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
