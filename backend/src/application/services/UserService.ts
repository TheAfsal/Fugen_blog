import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interface/UserRepository";
import { RegisterUserUseCase } from "../../domain/use-cases/user/RegisterUserUseCase";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { validate } from "class-validator";

export class UserService {
  private registerUserUseCase: RegisterUserUseCase;

  constructor(userRepository: UserRepository) {
    this.registerUserUseCase = new RegisterUserUseCase(userRepository);
  }

  async registerUser(dto: RegisterUserDTO): Promise<User> {
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error("Invalid user data");

    return this.registerUserUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
  }
}
