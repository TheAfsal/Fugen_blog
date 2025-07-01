import { User } from '../entities/User';
import { BaseRepository } from './BaseRepository';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}