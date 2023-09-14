import { IsString, IsEmail, IsEnum } from 'class-validator';

enum Role {
  CHATTER = 'chatter',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

export class CreateEmployeeDto {
  @IsString()
  public employeeName;

  @IsEmail()
  public employeeEmail;
}

export class AssignRoleDto {
  @IsEnum(Role)
  public role;
}
