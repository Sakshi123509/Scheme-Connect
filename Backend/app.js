import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import schemeRoutes from './routes/scheme.js';
import profileRoutes from './routes/profile.js';
import applicationRoutes from './routes/application.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/schemes', (await import('./routes/scheme.js')).default);
app.use('/api/profile', (await import('./routes/profile.js')).default);
app.use('/api/applications', (await import('./routes/application.js')).default);


app.get('/', (req, res) => {
    res.send('Government Schemes API');
});

export default app;
