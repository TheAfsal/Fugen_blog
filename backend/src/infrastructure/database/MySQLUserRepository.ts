// import { Pool } from 'mysql2/promise';
// import { User } from '../../domain/entities/User';
// import { UserRepository } from '../../domain/interface/UserRepository';
// import { BaseMySQLRepository } from './BaseMySQLRepository';

// export class MySQLUserRepository
//   extends BaseMySQLRepository<User, string>
//   implements UserRepository
// {
//   constructor(db: Pool) {
//     super(db, 'users');
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     const [rows] = await this.db.query(`SELECT * FROM users WHERE email = ?`, [email]);
//     return (rows as User[])[0] || null;
//   }
  
// }

import { Pool } from "mysql2/promise";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interface/UserRepository";

export class MySQLUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  async create(user: User): Promise<User> {
    await this.pool.execute(
      "INSERT INTO users (id, email, password, createdAt) VALUES (?, ?, ?, ?)",
      [user.id, user.email, user.password, user.createdAt]
    );
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await this.pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }
}