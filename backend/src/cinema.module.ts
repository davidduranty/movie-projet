import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Actor } from "./entities/actor.entity";
import { Movie } from "./entities/movie.entity";
import { Productor } from "./entities/productor.entity";
import { MovieService } from "./services/movie.service";
import { MovieController } from "./controllers/movie.controller";

@Module({
    imports: [MikroOrmModule.forFeature([Actor, Movie,Productor])],
    providers: [MovieService],
    controllers: [MovieController],
})

export class CinemaModule {}