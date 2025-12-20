import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Government Schemes API');
});

export default app;
