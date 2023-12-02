import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePayrollDto {
  @IsString()
  public employeeId;

  @IsString()
  public hourlyPay;

  @IsString()
  public commissionEarned;

  @IsString()
  public bonus;

  @IsString()
  public status;

  @IsString()
  public totalHours;

  @IsNumber()
  public totalPayment;
}
