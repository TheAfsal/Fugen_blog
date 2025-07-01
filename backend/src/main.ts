import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './interfaces/routes/postRoutes';
import userRoutes from './interfaces/routes/userRoutes';
import { pool } from './config/database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL');
    connection.release();
    console.log('Server running on port 5000');
  } catch (err) {
    console.error('Failed to connect to MySQL:', err);
    process.exit(1);
  }
});