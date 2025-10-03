// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cho phép cross-origin requests (tùy chỉnh nếu cần)
app.use(express.json());

// Routes
const jobPostingRoutes = require('./routes/jobPostingRoutes');
app.use('/api', jobPostingRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});