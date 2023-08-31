import { IsString, IsEmail, IsEnum, isEnum } from 'class-validator';

enum Role {
  CHATTER = 'chatter',
  ADMIN = 'admin',
  LEADER = 'team leader',
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
