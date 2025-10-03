// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cho phép cross-origin requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const jobPostingRoutes = require('./routes/jobPostingRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', jobPostingRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'JobVip API is running!',
    endpoints: {
      auth: '/api/auth/login',
      jobs: '/api/job-postings'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;