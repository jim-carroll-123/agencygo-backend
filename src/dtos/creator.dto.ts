import { IsString, IsEnum, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Gender } from '@/interfaces/creator.interface';

export class CreatorDTO {
  @IsNotEmpty()
  @IsString()
  creatorName: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  internalNotes?: string;

  @IsOptional()
  assignEmployee?: string[];

  @IsBoolean()
  autoRelink: boolean;

  @IsBoolean()
  status: boolean;

  @IsBoolean()
  @IsOptional()
  plateform: boolean;
}
