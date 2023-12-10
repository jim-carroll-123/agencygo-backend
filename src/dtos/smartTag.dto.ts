import { IsNumber, IsString } from 'class-validator';

export class CreateSmartTagDto {
  @IsString()
  public tagId;

  @IsString()
  public agencyId;

  @IsString()
  public creatorId;

  @IsNumber()
  public minimumAmount;

  @IsNumber()
  public maximumAmount;
}
