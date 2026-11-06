import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import authRoutes from './routes/authRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

await pool.query('SELECT NOW()');
console.log('Connected to PostgreSQL');

app.use(authRoutes);
app.use(ordersRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
