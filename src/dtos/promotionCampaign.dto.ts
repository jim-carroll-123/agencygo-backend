import { IsOptional, IsString, IsBoolean } from 'class-validator';
export class PromotionCampaignDto {
  @IsString()
  public agencyId;
  @IsString()
  public creatorId;
  @IsString()
  public userType;
  @IsString()
  public activityType;
  @IsString()
  public offerLimit;
  @IsString()
  public offerExpiry;
  @IsString()
  @IsOptional()
  public message;
  @IsBoolean()
  @IsOptional()
  public isExpired;
}
