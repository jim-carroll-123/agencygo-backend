import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  public rolename: string;

  @IsString()
  public description: string;
}
export class UpdateRoleDto {
  @IsString()
  public rolename: string;

  @IsString()
  public description: string;

  @IsString()
  public status: string;
}
