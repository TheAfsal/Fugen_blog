import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interface/UserRepository";
import { LoginUserUseCase } from "../../domain/use-cases/user/LoginUserUseCase";
import { RegisterUserUseCase } from "../../domain/use-cases/user/RegisterUserUseCase";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { validate } from "class-validator";

export class UserService {
  private registerUserUseCase: RegisterUserUseCase;
  private loginUserUseCase: LoginUserUseCase;

  constructor(userRepository: UserRepository) {
    this.registerUserUseCase = new RegisterUserUseCase(userRepository);
    this.loginUserUseCase = new LoginUserUseCase(userRepository);
  }

  async registerUser(dto: RegisterUserDTO): Promise<User> {
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error("Invalid user data");

    return this.registerUserUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
  }

  async loginUser(dto: LoginUserDTO): Promise<User> {
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error("Invalid login data");

    return this.loginUserUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
  }
}
