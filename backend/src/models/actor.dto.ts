import { IsString, IsOptional, IsInt } from 'class-validator';

class ActorDto {
  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsString()
  country: string;

  @IsOptional()
  start?: Date | null;

  @IsOptional()
  end?: Date | null;

  @IsOptional()
  @IsInt()
  productorId?: number;

  @IsOptional()
  @IsInt()
  movieId?: number;
}

export { ActorDto };
