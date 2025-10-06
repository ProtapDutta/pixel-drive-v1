// backend/server.js 

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { initializeCloudinary } from './config/cloudinary.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

dotenv.config();
connectDB();
initializeCloudinary(); // Initialize Cloudinary

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for raw JSON data
app.use(express.urlencoded({ extended: false })); // Body parser for form data

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Simple Error Handler (For async-handler errors)
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(err.status || 500).json({
message: err.message || 'Server Error',
stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
});
});

app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'File Manager Backend API is Live! 🚀',
    environment: process.env.NODE_ENV || 'production'
  });
});

// ❌ REMOVED: const PORT = process.env.PORT || 5000;
// ❌ REMOVED: app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// ✅ ADDED: Export the Express app instance for Vercel to use as a Serverless Function
export default app;