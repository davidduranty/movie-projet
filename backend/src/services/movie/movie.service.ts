import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, Injectable } from '@nestjs/common';
import {
  EntityRepository,
  LoadStrategy,
  QueryOrder,
  EntityManager,
  FilterQuery,
} from '@mikro-orm/core';
import { Movie } from '../../entities/movie.entity';
import { MovieDto } from '../../models/movie.dto';
import { HttpStatus } from '../../utils/http-status';

@Injectable()
class MovieService {
  public constructor(
    @InjectRepository(Movie)
    private readonly _movieService: EntityRepository<Movie>,
    private readonly _em: EntityManager,
  ) {}

  public async getAll(): Promise<MovieDto[]> {
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

  public async getByName(title: string): Promise<MovieDto[]> {
    let movieName: FilterQuery<Movie> = {};
    if (title) {
      movieName['title'] = { $ilike: `%${title}%` };
    }
    const movies = await this._movieService.find(movieName, {
      populate: ['actor'],
      populateOrderBy: { actor: { id: QueryOrder.ASC } },
      strategy: LoadStrategy.SELECT_IN,
      limit: 10,
      offset: 0,
      orderBy: { id: QueryOrder.ASC },
    });
    return movies;
  }

  public async getById(id: number): Promise<MovieDto[]> {
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
    if (!movie || movie.length === 0) {
      throw new HttpException(`no movies found`, HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  public async getMoviesByDateRange(
    start?: Date,
    end?: Date,
  ): Promise<MovieDto[]> {
    const dateRange: FilterQuery<Movie> = {};

    if (start && end) {
      dateRange.date = { $gte: start, $lte: end };
    } else if (start) {
      dateRange.date = { $gte: start };
    } else if (end) {
      dateRange.date = { $lte: end };
    }
    const movies = await this._movieService.find(dateRange, {
      strategy: LoadStrategy.SELECT_IN,
      limit: 10,
      offset: 0,
      orderBy: { id: QueryOrder.ASC },
    });
    return movies;
  }

  public async post(movieDto: MovieDto): Promise<MovieDto> {
    const addMovie = new Movie();
    addMovie.title = movieDto.title;
    addMovie.date = movieDto.date;
    addMovie.genre = movieDto.genre;
    this._em.persistAndFlush(addMovie);
    return addMovie;
  }

  public async removeId(id: number): Promise<boolean> {
    const movie = await this._movieService.nativeDelete({ id });
    if (!movie) {
      return false;
    }
    await this._movieService.nativeDelete(movie);
    return true;
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
