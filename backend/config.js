require("dotenv").config();
const config = {
  PORT: process.env.PORT || 3000,
  FRONTEND_URL: process.env.VITE_VERCEL_URL || "http://localhost:5173",
  DATABASE_URL: process.env.DATABASE_URL,
  API_SECRET: process.env.API_SECRET,
};

module.exports = config;
