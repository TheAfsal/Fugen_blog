import { IsString, IsNotEmpty, Length } from "class-validator";

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
