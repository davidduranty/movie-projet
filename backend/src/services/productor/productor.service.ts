import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Productor } from 'backend/src/entities/productor.entity';

@Injectable()
class ProductorService {
  public constructor(
    @InjectRepository(Productor)
    private readonly _productorService: EntityRepository<Productor>,
  ) {}

  public async getAll(): Promise<Productor[]> {
    const productors = await this._productorService.find(
      {},
      {
        populate: ['dataMovies'],
        populateOrderBy: { dataMovies: { id: QueryOrder.ASC } },
        strategy: LoadStrategy.SELECT_IN,
        limit: 10,
        offset: 0,
        orderBy: { id: QueryOrder.ASC },
      },
    );
    return productors;
  }

  public async get(id: number): Promise<Productor[]> {
    const productors = await this._productorService.find(
      { id: id },
      {
        populate: ['actors'],
        populateOrderBy: { actors: { id: QueryOrder.ASC } },
        strategy: LoadStrategy.SELECT_IN,
        limit: 10,
        offset: 0,
        orderBy: { id: QueryOrder.ASC },
      },
    );
    return productors;
  }
}
export { ProductorService };
