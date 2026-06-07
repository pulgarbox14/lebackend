import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  productName!: string;

  @IsNumber()
  @Min(0)
  quantity!: number;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsOptional()
  description?: string;
}