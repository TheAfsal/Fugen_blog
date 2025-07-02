import { IsString, MinLength, MaxLength } from "class-validator";

export class UpdatePostDTO {
  @IsString({ message: "Title must be a string" })
  @MinLength(1, { message: "Title is required" })
  @MaxLength(255, { message: "Title must not exceed 255 characters" })
  title: string;

  @IsString({ message: "Content must be a string" })
  @MinLength(1, { message: "Content is required" })
  content: string;
}
