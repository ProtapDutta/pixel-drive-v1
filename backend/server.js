// backend/server.js (Vercel Production Ready - FIXED)

import express from 'express';
// ❌ REMOVED: import dotenv from 'dotenv'; // Not needed, Vercel injects variables
import cors from 'cors';

// Import services and configurations
import { connectDB } from './config/db.js';
import { initializeCloudinary } from './config/cloudinary.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

// ❌ REMOVED: dotenv.config(); 

// 🎯 INITIALIZE SERVICES: These MUST read process.env variables injected by Vercel
connectDB();
initializeCloudinary(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Simple Error Handler (For async-handler errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Server Error',
        // In production, NEVER send the stack trace
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});

// Status Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'File Manager Backend API is Live! 🚀',
        environment: process.env.NODE_ENV || 'production'
    });
});

// ✅ EXPORT: Export the Express app instance for Vercel
export default app;