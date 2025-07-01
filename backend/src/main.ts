import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
import postRoutes from './interfaces/routes/postRoutes';
import userRoutes from './interfaces/routes/userRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.connect();

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));