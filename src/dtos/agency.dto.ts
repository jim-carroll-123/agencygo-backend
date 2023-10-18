import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  public agencyName;

  @IsNumber()
  public numberOfCreators;

  @IsString()
  public websiteUrl;

  @IsString()
  public socialMediaLink;

  @IsString()
  @IsOptional()
  public agencyLogo;
}
