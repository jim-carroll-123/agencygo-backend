import { IsDate, IsDateString, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatesmartTagsDto {
  @IsString()
  public userId;

  @IsString()
  public employeeId;

  @IsNumber()
  public amount;

  @IsString()
  public status;

  @IsString()
  public description;

  @IsDateString()
  public date:Date
  
}
