import { Pool } from 'mysql2/promise';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/interface/UserRepository';
import { BaseMySQLRepository } from './BaseMySQLRepository';

export class MySQLUserRepository
  extends BaseMySQLRepository<User, string>
  implements UserRepository
{
  constructor(db: Pool) {
    super(db, 'users');
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await this.db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return (rows as User[])[0] || null;
  }
}