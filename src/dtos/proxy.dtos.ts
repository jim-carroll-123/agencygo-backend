import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class ProxyDTO {
  @IsNotEmpty()
  @IsString()
  proxy_id: string;

  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsNotEmpty()
  @IsString()
  proxyAddress: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsBoolean()
  valid: boolean;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;
}
