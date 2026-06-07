import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customerName!: string;  // ← nom du client

  @IsNumber()
  @Min(0)
  quantity!: number;      // ← quantité commandée

  @IsNumber()
  @Min(0)
  totalPrice!: number;    // ← prix total

  @IsString()
  @IsOptional()
  status?: string;       // ← "pending", "completed", "cancelled"
}