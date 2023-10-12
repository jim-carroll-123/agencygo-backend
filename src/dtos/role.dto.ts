import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  public rolename: string;

  @IsString()
  public description: string;
}
