
import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class MovieDto {
  @IsString()
  title: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  genre: string;
}

export { MovieDto };
