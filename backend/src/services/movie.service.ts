import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Movie } from '../entities/movie.entity';

@Injectable()
class MovieService {
  public constructor(
    @InjectRepository(Movie)
    private readonly _movieService: EntityRepository<Movie>,
  ) {}

  public async getAll(): Promise<Movie[]> {
    const movies = await this._movieService.find(
      { genre: '' },
      {
        populate: ['actor', 'productor'],
        strategy: LoadStrategy.SELECT_IN,
        limit: 10,
        offset: 0,
        orderBy: { id: QueryOrder.ASC },
      },
    );
    return movies;
  }
}

export { MovieService };
