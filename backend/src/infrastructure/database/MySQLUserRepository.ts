import { Pool, PoolConnection } from 'mysql2/promise';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/interface/UserRepository';

export class MySQLUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  private async getConnection(): Promise<PoolConnection> {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      throw Object.assign(new Error('Failed to acquire database connection'), { statusCode: 500 });
    }
  }

  async create(user: User): Promise<User> {
    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      await connection.execute(
        'INSERT INTO users (id, email, password, createdAt) VALUES (?, ?, ?, ?)',
        [user.id, user.email, user.password, user.createdAt]
      );
      return user;
    } catch (error) {
      throw Object.assign(new Error('Failed to save user'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    let connection: PoolConnection | null = null;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
      const users = rows as User[];
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw Object.assign(new Error('Failed to find user by email'), { statusCode: 500 });
    } finally {
      if (connection) connection.release();
    }
  }
}