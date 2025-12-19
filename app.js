import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import schemeRoutes from './routes/scheme.js';
import applicationRoutes from './routes/application.js';
import errorHandler from './middleware/errorhandler.js';

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
    res.send('Government Schemes API');
});

// Error handling middleware
app.use(errorHandler);

export default app;
