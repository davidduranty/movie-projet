import { IsDate, IsString } from 'class-validator';

class MovieDto {
  @IsString()
  title: string;

  @IsDate()
  date: Date;

  @IsString()
  genre: string;
}

export { MovieDto };
