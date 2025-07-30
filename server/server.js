import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Connect to DB
await connectDB();

// Allowed origins
const allowedOrigins = [
  "https://quick-blog-ktkezaa9q-yash-aggarwals-projects-b2f167bd.vercel.app", // Vercel frontend
  "http://localhost:3000" // Local dev
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests quickly
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Server for local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}

// Export for Vercel serverless
export default app;
