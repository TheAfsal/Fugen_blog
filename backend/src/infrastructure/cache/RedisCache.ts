import { RedisClientType } from "redis";
import { Post } from "../../domain/entities/Post";

export class RedisCache {
  constructor(private redis: RedisClientType) {}

  async cachePost(post: Post): Promise<void> {
    await this.redis.set(`post:${post.id}`, JSON.stringify(post), { EX: 3600 });
  }

  async getCachedPost(id: string): Promise<Post | null> {
    const data = await this.redis.get(`post:${id}`);
    return data ? JSON.parse(data) : null;
  }
}
