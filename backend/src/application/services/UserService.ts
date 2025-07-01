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
    if (errors.length > 0) {
      throw Object.assign(new Error(errors[0].constraints?.[Object.keys(errors[0].constraints)[0]] || 'Invalid user data'), { statusCode: 400 });
    }

    return this.registerUserUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
  }

  async loginUser(dto: LoginUserDTO): Promise<User> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw Object.assign(new Error(errors[0].constraints?.[Object.keys(errors[0].constraints)[0]] || 'Invalid login data'), { statusCode: 400 });
    }

    return this.loginUserUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
  }
}
