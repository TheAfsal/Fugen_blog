import { User } from "../../entities/User";
import { UserRepository } from "../../interface/UserRepository";
import { compare } from "bcryptjs";

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: Omit<User, "id" | "createdAt">): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
    }
    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid) {
      throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
    }

    return user;
  }
}