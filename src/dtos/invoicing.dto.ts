import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInvoicingDto {
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
}
