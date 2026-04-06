import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/environment';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

// Import routes
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import companyRoutes from './routes/companyRoutes';
import authRoutes from './routes/authRoutes';
import classGroupRoutes from './routes/classGroupRoutes';
import subjectRoutes from './routes/subjectRoutes';
import postRoutes from './routes/postRoutes';
import studentAcademicRoutes from './routes/studentAcademicRoutes';

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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/classes', classGroupRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/students', studentAcademicRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 IPIZ Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;