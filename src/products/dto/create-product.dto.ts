import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title (unique)',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sizes: Array<string>;

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: Array<string>;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: Array<string>;
}
