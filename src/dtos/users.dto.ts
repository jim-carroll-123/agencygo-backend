import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public amount: string;

  @IsBoolean()
  @IsNotEmpty()
  public status: Boolean;

  @IsString()
  @IsNotEmpty()
  public agencyName: string;

  @IsNumber()
  public currentModalBalance: Number;

  @IsString()
  public agencyPer: string;

  @IsDateString()
  @IsNotEmpty()
  public date: Date;

  @IsNumber()
  @IsNotEmpty()
  public numberOfCreators: number;

  @IsString()
  @IsNotEmpty()
  public agencyWebsite: string;

  @IsString()
  public agencyMediaSocial: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
