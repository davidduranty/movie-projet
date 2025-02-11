import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Actor } from './entities/actor.entity';
import { Movie } from './entities/movie.entity';
import { Productor } from './entities/productor.entity';
import { MovieService } from './services/movie/movie.service';
import { MovieController } from './controllers/movie/movie.controller';
import { ActorService } from './services/actor/actor.service';
import { ActorController } from './controllers/actor/actor.controller';
import { ProductorService } from './services/productor/productor.service';
import { ProductorController } from './controllers/productor/productor.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Actor, Movie, Productor])],
  providers: [MovieService, ActorService, ProductorService],
  controllers: [MovieController, ActorController, ProductorController],
})
export class CinemaModule {}
