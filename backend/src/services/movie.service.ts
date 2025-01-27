import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
class MovieService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
}

export {MovieService}
