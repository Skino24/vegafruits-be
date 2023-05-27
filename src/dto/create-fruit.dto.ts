import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateFruitDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly priceBy: string;

  @IsString()
  image: string;
}
