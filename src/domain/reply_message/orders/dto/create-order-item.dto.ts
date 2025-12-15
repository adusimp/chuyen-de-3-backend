import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @Type(() => Number)
  @IsInt()
  product_id: number;

  @IsString()
  @IsNotEmpty()
  size: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  quantity: number;

}
