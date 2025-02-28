import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class UserPayload {
  @IsString()
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsString()
  job!: string;
}
