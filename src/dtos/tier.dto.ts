import { IsString } from 'class-validator';
export class TierDto {
  @IsString()
  public agencyId;
  @IsString()
  public creatorId;
  @IsString()
  public name;
}
