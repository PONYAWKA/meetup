import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class PostCreateMeetupDTO {
  @IsNotEmpty()
  @IsString()
  theme: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  tags: string[];

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  date: string;
}
