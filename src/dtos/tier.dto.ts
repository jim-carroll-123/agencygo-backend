import { IsString } from 'class-validator';
export class CreateTierDto {
  @IsString()
  public name;
}
