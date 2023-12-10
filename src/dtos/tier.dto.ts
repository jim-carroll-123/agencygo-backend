import { IsString } from 'class-validator';
export class TierDto {
  @IsString()
  public name;
}
