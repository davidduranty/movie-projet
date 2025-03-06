import { IsBoolean, IsNumber, IsString } from 'class-validator';

class ProductorDto {
  @IsNumber()
  id: number

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsNumber()
  age: number;

  @IsBoolean()
  now: boolean;
}

export { ProductorDto };
