import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚩 दुर्गा स्थान, भटसिमर - Backend Server Running`);
  console.log(`🌐 PORT: ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`==================================================`);
});

