import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';
import { Productor } from './productor.entity';
import { BaseEntity } from './base.entity';

@Entity({ schema: 'movie' })
class Actor extends BaseEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ApiProperty({
    description: "Nom de l'acteur",
    example: ' Doe',
  })
  @Property({ type: 'string' })
  lastname: string;

  @ApiProperty({
    description: "Prénom de l'acteur",
    example: 'John',
  })
  @Property({ type: 'string' })
  firstname: string;

  @ApiProperty({
    description: 'Pays',
    example: 'USA',
  })
  @Property({ type: 'string' })
  country: string;

  @ManyToOne(() => Productor, { nullable: true })
  productor?: Productor;

  @ManyToMany({ entity: () => Movie, mappedBy: 'actor' })
  dataMovies = new Collection<Movie>(this);
}

export { Actor };
