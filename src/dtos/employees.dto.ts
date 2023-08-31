import { IsString, IsEmail, IsEnum } from 'class-validator';

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

  @IsEnum(Role)
  public role;
}
