import { User } from '../../entities/User';
import { UserRepository } from '../../interface/UserRepository';
import { hash } from 'bcryptjs';

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) throw new Error('User already exists');

    const user: User = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      password: await hash(data.password, 10),
      createdAt: new Date(),
    };
    return this.userRepository.create(user);
  }
}