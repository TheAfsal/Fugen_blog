import { Pool } from 'mysql2/promise';
import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../../domain/interface/PostRepository';
import { v4 as uuidv4 } from 'uuid';
import { redis } from '../../config/redis.connection';

export class MySQLPostRepository implements PostRepository {
  constructor(private pool: Pool) {}

  async create(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    const id = uuidv4();
    const createdAt = new Date();
    const [result] = await this.pool.execute(
      'INSERT INTO posts (id, title, content, authorId, createdAt) VALUES (?, ?, ?, ?, ?)',
      [id, post.title, post.content, post.authorId, createdAt]
    );
    const newPost: Post = { id, ...post, createdAt };
    await redis.del('posts');
    return newPost;
  }

  async findAll(): Promise<Post[]> {
    const cached = await redis.get('posts');
    if (cached) return JSON.parse(cached);

    const [rows] = await this.pool.execute('SELECT * FROM posts');
    const posts = rows as Post[];
    await redis.set('posts', JSON.stringify(posts), { EX: 3600 });
    return posts;
  }

  async findById(id: string): Promise<Post | null> {
    const [rows] = await this.pool.execute('SELECT * FROM posts WHERE id = ?', [id]);
    const posts = rows as Post[];
    return posts.length > 0 ? posts[0] : null;
  }

  async findByAuthorId(authorId: string): Promise<Post[]> {
    const cacheKey = `posts:author:${authorId}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const [rows] = await this.pool.execute('SELECT * FROM posts WHERE authorId = ?', [authorId]);
    const posts = rows as Post[];
    await redis.set(cacheKey, JSON.stringify(posts), { EX: 3600 });
    return posts;
  }

  async update(id: string, data: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    const [result] = await this.pool.execute(
      'UPDATE posts SET title = ?, content = ? WHERE id = ? AND authorId = ?',
      [data.title, data.content, id, data.authorId]
    );
    const updatedPost: Post = { id, ...data, createdAt: new Date() };
    await redis.del('posts');
    await redis.del(`posts:author:${data.authorId}`);
    return updatedPost;
  }

  async delete(id: string): Promise<void> {
    const [rows] = await this.pool.execute('SELECT authorId FROM posts WHERE id = ?', [id]);
    const posts = rows as Post[];
    const authorId = posts.length > 0 ? posts[0].authorId : null;

    await this.pool.execute('DELETE FROM posts WHERE id = ?', [id]);
    await redis.del('posts');
    if (authorId) await redis.del(`posts:author:${authorId}`);
  }
}