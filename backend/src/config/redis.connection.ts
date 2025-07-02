import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redis: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://redis-container:6379',
});

redis.connect().catch((err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export type RedisClient = RedisClientType;