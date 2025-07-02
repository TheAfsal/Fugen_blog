import { Pool, PoolConnection } from 'mysql2/promise';
import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../../domain/interface/PostRepository';
import { RedisClient } from '../../config/redis.connection';

export class MySQLPostRepository implements PostRepository {
  constructor(private pool: Pool, private redis: RedisClient) {}

  private async getConnection(): Promise<PoolConnection> {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      throw Object.assign(new Error('Failed to acquire database connection'), { statusCode: 500 });
    }
  }

  private async clearCache(authorId?: string): Promise<void> {
    try {
      const allKeys = await this.redis.keys('posts:page:*');
      if (allKeys.length > 0) {
        await this.redis.del(allKeys);
      }

      if (authorId) {
        const authorKeys = await this.redis.keys(`posts:author:${authorId}:*`);
        if (authorKeys.length > 0) {
          await this.redis.del(authorKeys);
        }
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  async create(post: Post): Promise<Post> {
    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      await connection.execute(
        'INSERT INTO posts (id, title, content, authorId, createdAt) VALUES (?, ?, ?, ?, ?)',
        [post.id, post.title, post.content, post.authorId, post.createdAt]
      );
      await this.clearCache(post.authorId);
      return post;
    } catch (error) {
      throw Object.assign(new Error('Failed to create post'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }

  async findAll(page: number, limit: number, search = ''): Promise<{ posts: Post[]; total: number }> {
    const cacheKey = `posts:page:${page}:limit:${limit}:search:${search}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      const offset = (page - 1) * limit;
      const query = search
        ? 'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? LIMIT ? OFFSET ?'
        : 'SELECT * FROM posts LIMIT ? OFFSET ?';
      const countQuery = search
        ? 'SELECT COUNT(*) as total FROM posts WHERE title LIKE ? OR content LIKE ?'
        : 'SELECT COUNT(*) as total FROM posts';
      
      const searchTerm = `%${search}%`;
      const params = search ? [searchTerm, searchTerm, limit, offset] : [limit, offset];
      const countParams = search ? [searchTerm, searchTerm] : [];

      const [rows] = await connection.execute(query, params);
      const [countRows] = await connection.execute(countQuery, countParams);

      const posts = rows as Post[];
      const total = (countRows as any[])[0].total;

      const result = { posts, total };
      await this.redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
      return result;
    } catch (error) {
      throw Object.assign(new Error('Failed to fetch posts'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }

  async findByAuthorId(authorId: string, page: number, limit: number): Promise<{ posts: Post[]; total: number }> {
    const cacheKey = `posts:author:${authorId}:page:${page}:limit:${limit}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      const offset = (page - 1) * limit;
      const [rows] = await connection.execute(
        'SELECT * FROM posts WHERE authorId = ? LIMIT ? OFFSET ?',
        [authorId, limit, offset]
      );
      const [countRows] = await connection.execute(
        'SELECT COUNT(*) as total FROM posts WHERE authorId = ?',
        [authorId]
      );

      const posts = rows as Post[];
      const total = (countRows as any[])[0].total;

      const result = { posts, total };
      await this.redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
      return result;
    } catch (error) {
      throw Object.assign(new Error('Failed to fetch posts by author'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }

  async findById(id: string): Promise<Post | null> {
    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [id]);
      const posts = rows as Post[];
      return posts.length > 0 ? posts[0] : null;
    } catch (error) {
      throw Object.assign(new Error('Failed to find post'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }

  async update(id: string, post: Partial<Post>): Promise<Post> {
    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      await connection.execute(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [post.title, post.content, id]
      );
      const updatedPost = await this.findById(id);
      if (!updatedPost) {
        throw Object.assign(new Error('Post not found'), { statusCode: 404 });
      }
      await this.clearCache(updatedPost.authorId);
      return updatedPost;
    } catch (error) {
      throw Object.assign(new Error('Failed to update post'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }

  async delete(id: string): Promise<void> {
    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      const post = await this.findById(id);
      if (!post) {
        throw Object.assign(new Error('Post not found'), { statusCode: 404 });
      }
      await connection.execute('DELETE FROM posts WHERE id = ?', [id]);
      await this.clearCache(post.authorId);
    } catch (error) {
      throw Object.assign(new Error('Failed to delete post'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }
}