require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db.js");
const cors = require("cors");
const app = express();

// Import routes
const authRoutes = require("./src/routes/authRoutes.js");
const postRoutes = require("./src/routes/postRoutes.js");

// Load environment variables
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Basic health-check route
app.get("/", (req, res) => {
  res.send("RBAC Blog API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
