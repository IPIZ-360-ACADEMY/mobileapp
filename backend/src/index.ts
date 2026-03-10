import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './src/config/environment';
import { errorHandler } from './src/middlewares/errorHandler';
import { notFoundHandler } from './src/middlewares/notFoundHandler';

// Import routes
import userRoutes from './src/routes/userRoutes';
import jobRoutes from './src/routes/jobRoutes';
import companyRoutes from './src/routes/companyRoutes';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'IPIZ Backend',
  });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 IPIZ Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;