import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {config as mikroOrmConfig} from './mikro-orm.config';
import { CinemaModule } from './cinema.module';




@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    CinemaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
