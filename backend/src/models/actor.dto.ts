import { IsString, IsOptional, IsDate } from 'class-validator';

class ActorDto {
  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsString()
  country: string;

  @IsOptional()
  start?: Date;

  @IsOptional()
  end?: Date;
}

export { ActorDto };
