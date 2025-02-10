import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Movie } from '../../entities/movie.entity';

@Injectable()
class MovieService {
  public constructor(
    @InjectRepository(Movie)
    private readonly _movieService: EntityRepository<Movie>,
  ) {}

  public async getAll(): Promise<Movie[]> {
    // const dateFilter = {};
    const movies = await this._movieService.find(
      {},
      {
        populate: ['actor'],
        populateOrderBy: { actor: { id: QueryOrder.ASC } },
        strategy: LoadStrategy.SELECT_IN,
        limit: 10,
        offset: 0,
        orderBy: { id: QueryOrder.ASC },
      },
    );
    return movies;
  }

  public async get(id: number): Promise<Movie[]> {
    const movie = await this._movieService.find(
      { id: id },
      {
        populate: ['actor'],
        populateOrderBy: { actor: { id: QueryOrder.ASC } },
        strategy: LoadStrategy.SELECT_IN,
        limit: 10,
        offset: 0,
        orderBy: { id: QueryOrder.ASC },
      },
    );

    return movie;
  }

  // private getDateFilter(date: Date | null): object {
  //   return date
  //     ? {
  //         $and: [
  //           {
  //             $or: [{ start: { $lte: date } }, { start: null }],
  //           },
  //           {
  //             $or: [{ end: { $gte: date } }, { end: null }],
  //           },
  //         ],
  //       }
  //     : {};
  // }
}

export { MovieService };
