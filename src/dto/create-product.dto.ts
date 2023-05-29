import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, isString } from "class-validator";
import { priceType } from "../types";

export class CreateProductDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @Max(99)
  @Transform(({ value }) => {
    return Number(value);
  })
  readonly price: string;

  @IsNotEmpty()
  @IsString()
  readonly priceBy: priceType;

  @IsString()
  @IsOptional()  
  image: string;
}
