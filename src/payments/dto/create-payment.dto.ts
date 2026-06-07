import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @Min(0)
  amount!: number;

  @IsString()
  paymentMethod!: string; // cash, card, mobile

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;
}