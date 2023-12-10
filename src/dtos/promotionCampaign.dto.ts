import { IsNumber, IsOptional, IsString } from 'class-validator';
export class PromotionCampaignDto {
  @IsString()
  public agencyId;
  @IsString()
  public creatorId;
  @IsString()
  public userType;
  @IsString()
  @IsNumber()
  public activityType;
  @IsString()
  @IsNumber()
  public offerLimit;
  @IsString()
  @IsNumber()
  public offerExpiry;
  @IsString()
  @IsOptional()
  public message;
}
