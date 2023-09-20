import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionServerDTO {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
