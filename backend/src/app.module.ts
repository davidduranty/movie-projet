import { Module } from '@nestjs/common';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';




@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class AppModule {}
