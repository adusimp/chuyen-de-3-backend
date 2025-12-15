import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
