import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';

export class ShiftsDto {
  @IsString()
  @IsNotEmpty()
  public email: string;
}
