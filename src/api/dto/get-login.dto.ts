import { IsNotEmpty, IsString } from "class-validator";

export class GetLogInDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
