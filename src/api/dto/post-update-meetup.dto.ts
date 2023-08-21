import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class PutUpdateMeetupDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsArray()
  description?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @IsString()
  person_name?: string;
}
