import {
  EntityManager,
  EntityRepository,
  LoadStrategy,
  QueryOrder,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Productor } from '../../entities/productor.entity';
import { ProductorDto } from '../../models/productor.dto';

@Injectable()
class ProductorService {
  public constructor(
    @InjectRepository(Productor)
    private readonly _productorService: EntityRepository<Productor>,
    private readonly _em: EntityManager,
  ) {}

  public async getAll(): Promise<ProductorDto[]> {
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

  public async get(id: number): Promise<ProductorDto[]> {
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

  public async post(productorDto: ProductorDto): Promise<ProductorDto> {
    const addProductor = new Productor();
    addProductor.lastname = productorDto.lastname;
    addProductor.firstname = productorDto.firstname;
    addProductor.age = productorDto.age;
    addProductor.now = productorDto.now;
    await this._em.persistAndFlush(addProductor);

    return addProductor;
  }

  public async removeProductore(id: number): Promise<boolean> {
    const deletedCount = await this._productorService.nativeDelete({ id });
    return deletedCount > 0;
  }
}
export { ProductorService };
