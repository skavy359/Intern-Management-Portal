const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/error-handler');

const authRoutes = require('./routes/auth.routes');
const internRoutes = require('./routes/intern.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(requestLogger);

app.use(express.json({ limit: '1mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/interns', internRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/intern-practice', internRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`\n  Intern Management Portal API`);
  console.log(`  Running on: http://localhost:${env.port}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}\n`);
});