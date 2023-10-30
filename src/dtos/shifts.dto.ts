import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';

export class ShiftsDto {
  @IsString()
  @IsNotEmpty()
  public employeeId: string;
  public creatorId: string;
  public startTime: string;
  public endTime: string;
  public startDate: string;
  public endDate: string;
  public frequency: string;
  public repeat: {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
  };
}
