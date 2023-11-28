import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

enum Role {
  CHATTER = 'chatter',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

export class CreateEmployeeDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public role: Role;
}

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public role: Role;

  @IsOptional()
  @IsString()
  public agencyId: string;
}

export class AssignRoleDto {
  @IsEnum(Role)
  public role;
}
