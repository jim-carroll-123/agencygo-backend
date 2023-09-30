import { IsString, IsEmail, IsEnum } from 'class-validator';

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
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public role: Role;

  @IsString()
  public agencyId: string;
}

export class AssignRoleDto {
  @IsEnum(Role)
  public role;
}
